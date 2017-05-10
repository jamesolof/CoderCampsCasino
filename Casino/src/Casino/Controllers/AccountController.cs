using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Casino.Models;
using Casino.Models.AccountViewModels;
using Casino.Services;
using Casino.Data;

namespace Casino.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private ApplicationDbContext db;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory,
            ApplicationDbContext db
           )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<AccountController>();
            this.db = db;
        }

     
        // POST: /Account/Login
        [HttpPost("Login")]
        [AllowAnonymous]

        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");
                    var user = await GetUser(model.Email);
                    return Ok(user);
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning(2, "User account locked out.");
                    return new ForbidResult();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return BadRequest(ModelState);
                }
            }

            return BadRequest(ModelState);
        }

        private async Task<AuthUserViewModel> GetUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = await _userManager.GetClaimsAsync(user);

            var vm = new AuthUserViewModel()
            {
                UserName = user.UserName,
                Nickname = user.Nickname,
                IsAdmin = claims.Any(x => x.Value.Equals("admin")),
                Tokens = user.Tokens,
                GamesPlayed = user.GamesPlayed,
                GamesWon = user.GamesWon,
                NavBarColor = user.NavBarColor,
                BackgroundColor = user.BackgroundColor,
                Id = user.Id,
                Friends = user.Friends
                //
            };
            return vm;

        }

        // POST: /Account/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser {Nickname= model.Nickname, UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(3, "User created a new account with password.");
                    return Ok();
                }
                AddErrors(result);
            }
            return BadRequest(ModelState);
        }

        // POST: /Account/LogOff
        [HttpPost("LogOff")]
        public async Task<IActionResult> LogOff()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            return Ok();
        }

        // GET: /Account/ConfirmEmail
        [HttpGet("ConfirmEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromQuery]string userId, [FromQuery]string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest("Error");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("Error");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest("Error");
        }

 
        // POST: /Account/ForgotPassword
        [HttpPost("Forgotpassword")]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    //return View("ForgotPasswordConfirmation");
                    return Ok();
                }

            }

            // If we got this far, something failed, redisplay form
            //return View(model);
            return BadRequest(ModelState);
        }

        // POST: /Account/ResetPassword
        [HttpPost("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                //return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                return Ok();
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                //return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                return Ok();
            }
            AddErrors(result);
            return BadRequest(ModelState);
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public IActionResult Put(string id, [FromBody]ApplicationUser usr)
        {
            var item = db.Users.FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }
            if (usr == null)
            {
                return NotFound();
            }
            item.Tokens = usr.Tokens;
            item.GamesPlayed = usr.GamesPlayed;
            item.GamesWon = usr.GamesWon;
            item.Friends = usr.Friends;
            item.BackgroundColor = usr.BackgroundColor;
            item.NavBarColor = usr.NavBarColor;

            db.Update(item);
            db.SaveChanges();

            return Ok(item);
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<BasicUserDTO> Get()
        {
            var friendsUser = db.Users
                       .Select(p => new BasicUserDTO()
                       {
                           Email = p.Email,
                           Tokens = p.Tokens,
                           GamesPlayed = p.GamesPlayed,
                           GamesWon = p.GamesWon,
                           Nickname = p.Nickname
                           //NavBarColor = p.NavBarColor,
                           //BackgroundColor = p.BackgroundColor
                       });

            return friendsUser;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult Get(string id)
        {
            var item = db.Users.FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public IActionResult Delete(string id)
        {
            var item = db.Users.FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }
            db.Users.Remove(item);
            db.SaveChanges();
            return Ok();
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
    }
}


