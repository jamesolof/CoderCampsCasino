using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;


namespace UnitTestProject
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var list = new List<BasicUserDTO>();

            Mock<IRepo> db = new Mock<IRepo>();
            db.Setup(x => x.fetch()).Returns(list);

            var controller = new Controller1(db.Object);
            var usr = new BasicUserDTO
            {
                Id = 1,
                Email = "Q@qq.com",
                Tokens = 1800,
                GamesPlayed = 13,
                GamesWon = 6,
                Nickname = "crybaby"
            };

            controller.getUsers();


        }

        [TestMethod]
        public void TestMethod2()
        {
            var list = new List<BasicUserDTO>();

            Mock<IRepo> db = new Mock<IRepo>();
            db.Setup(x => x.fetch()).Returns(list);

            var controller = new Controller1(db.Object);
            var usr = new BasicUserDTO
            {
                Id = 1,
                Email = "Q@qq.com",
                Tokens = 1800,
                GamesPlayed = 13,
                GamesWon = 6,
                Nickname = "crybaby"
            };

            controller.puts(1, usr);


        }
        [TestMethod]
        public void TestMethod3()
        {
            var list = new List<BasicUserDTO>();

            Mock<IRepo> db = new Mock<IRepo>();
            db.Setup(x => x.fetch()).Returns(list);

            var controller = new Controller1(db.Object);
            var usr = new BasicUserDTO
            {
                Id = 1,
                Email = "Q@qq.com",
                Tokens = 1800,
                GamesPlayed = 13,
                GamesWon = 6,
                Nickname = "crybaby"
            };

            controller.delete(1);


        }
        [TestMethod]
        public void TestMethod4()
        {
            var list = new List<BasicUserDTO>();

            Mock<IRepo> db = new Mock<IRepo>();
            db.Setup(x => x.fetch()).Returns(list);

            var controller = new Controller1(db.Object);
            var usr = new BasicUserDTO
            {
                Id = 1,
                Tokens = 1800,
                Email = "Q@qq.com",
                GamesPlayed = 13,
                GamesWon = 6,
                Nickname = "crybaby"
            };

            controller.getUsers();
        }

        [TestMethod]
        public void TestMethod5()
        {
            string str = "";
            int[] nums1 = new int[] { 1,2,3 };
            int[] nums2 = new int[] { 1, 2, 3 };
            int[] nums3 = new int[] { 1, 2, 3 };

            if (nums1[0] == nums2[0] && nums1[0] == nums3[0])
            {
                str = "winner";
            }
            else
            {
                str = "loss";
            }
            Assert.AreEqual("winner", str);
        }

        [TestMethod]
        public void TestMethod6()
        {
            string str = "";
            int[] nums1 = new int[] { 4, 1, 4 };
            int[] nums2 = new int[] { 5, 2, 5 };
            int[] nums3 = new int[] { 6, 3, 6 };

            if (nums1[0] == nums2[0] && nums1[0] == nums3[0])
            {
                str = "winner";
            }
            else
            {
                str = "loss";
            }
            Assert.AreEqual("loss", str);
        }

        [TestMethod]
        public void TestMethod7()
        {
            // 4  3 4
            // 5  4 5
            // 6  5 6
            string str = "";
            int[] nums1 = new int[] { 4, 5, 6 };
            int[] nums2 = new int[] { 3, 4, 5 };
            int[] nums3 = new int[] { 4, 5, 6 };

            if (nums1[0] == nums2[1] && nums1[0] == nums3[0])
            {
                str = "winner";
            }

            else
            {
                str = "loss";
            }
            Assert.AreEqual("winner", str);
        }

        [TestMethod]
        public void TestMethod8()
        {
            // 4  3  2
            // 5  4  3
            // 6  5  4
            string str = "";
            int[] nums1 = new int[] { 4, 5, 6 };
            int[] nums2 = new int[] { 3, 4, 5 };
            int[] nums3 = new int[] { 2, 3, 4 };

            if (nums1[0] == nums2[1] && nums1[0] == nums3[2])
            {
                str = "winner";
            }
            else
            {
                str = "loss";
            }
            Assert.AreEqual("winner", str);
        }

        [TestMethod]
        public void TestMethod9()
        {
            // 2  3  4
            // 3  4  5
            // 4  5  6
            string str = "";
            int[] nums1 = new int[] { 2, 3, 4 };
            int[] nums2 = new int[] { 3, 4, 5 };
            int[] nums3 = new int[] { 4, 5, 6 };

            if (nums1[2] == nums2[1] && nums1[2] == nums3[0])
            {
                str = "winner";
            }
            else
            {
                str = "loss";
            }
            Assert.AreEqual("winner", str);
        }

        [TestMethod]
        public void TestMethod10()
        {
            // 2  3  2
            // 3  4  3
            // 4  5  4
            string str = "";
            int[] nums1 = new int[] { 2, 3, 4 };
            int[] nums2 = new int[] { 3, 4, 5 };
            int[] nums3 = new int[] { 2, 3, 4 };

            if (nums1[2] == nums2[1] && nums1[2] == nums3[2])
            {
                str = "winner";
            }
            else
            {
                str = "loss";
            }
            Assert.AreEqual("winner", str);
        }





    }




    public class Repo : IRepo
    {
        public List<BasicUserDTO> fetch()
        {
            var list = new List<BasicUserDTO>();
            list.Add(new BasicUserDTO
            {
                Id = 1,
                Email = "GG@GG.com",
                Tokens = 2500,
                GamesPlayed = 120,
                GamesWon = 52,
                Nickname = "derp"
            });

            return list;
        }

        


    }

    public interface IRepo
    {
        List<BasicUserDTO> fetch();
    }

    public class Controller1
    {
        public IRepo db;

        public Controller1(IRepo db)
        {
            this.db = db;
        }

        public IEnumerable<BasicUserDTO> getUsers()
        {
            var friendsUser = db.fetch()
                     .Select(p => new BasicUserDTO()
                     {
                         Id = p.Id,
                         Email = p.Email,
                         Tokens = p.Tokens,
                         GamesPlayed = p.GamesPlayed,
                         GamesWon = p.GamesWon,
                         Nickname = p.Nickname
                     });

            return friendsUser;
        }

        public void puts(int id, BasicUserDTO usr)
        {
            var item = new BasicUserDTO();

            item = db.fetch().FirstOrDefault(x => x.Id == id);

            if (item != null)
            {
                item.Tokens = usr.Tokens;
                item.GamesPlayed = usr.GamesPlayed;
                item.GamesWon = usr.GamesWon;
                item.BackgroundColor = usr.BackgroundColor;
                item.NavBarColor = usr.NavBarColor;
            }


        }

        public void delete(int id)
        {
            var item = db.fetch().FirstOrDefault(x => x.Id == id);

            if (item != null)
            {
                //deleted
            }

        }

    }
    public class BasicUserDTO
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public int Tokens { get; set; }
        public int GamesWon { get; set; }
        public string NavBarColor { get; set; }
        public string BackgroundColor { get; set; }

        public double GamesPlayed { get; set; }
    }

}