namespace Casino.Services {

    export class ResourceService {

        protected updateResourceAction: ng.resource.IActionHash = {
            'update': { method: 'PUT' }
        };
    }

    export class PlayerService extends ResourceService {

        private PlayerResource: IUpdatableResourceClass<any>;
        public user;

        static $inject = [
            '$resource',
            '$http',
            'UserService'
        ];

        constructor(
            $resource: ng.resource.IResourceService,
            private $http: ng.IHttpService,
            private UserService: Services.UserService
        ) {
            super();
            this.PlayerResource = $resource<Models.UserModel,
                IAppUserResourceClass>('api/account/:id', null, this.updateResourceAction);
        }

        public updateTokens(user: Models.UserModel, tokens: number): void {
            user.tokens += tokens;
            this.UserService.updateSession(user);
            this.PlayerResource.update({ id: user.id }, user);
        }

        public addFriend(user: Models.UserModel, friend: Models.friendModel) {
            user.friends += `,${friend.nickname}`;
            this.PlayerResource.update({ id: user.id }, user);
            this.UserService.updateSession(user);
        };

        public removeFriend(user: Models.UserModel, friend: Models.friendModel) {
            let that = this;
            let removed = user.friends.split(',')
            console.log(removed);
            removed.forEach(function (name, i, removed) {
                if (name == friend.nickname) {
                    removed.splice(i, 1);
                    user.friends = removed.join(',')
                    that.PlayerResource.update({ id: user.id }, user);
                    that.UserService.updateSession(user);
                }
            })
        };


        public updateGamesPlayed(user: Models.UserModel): void {
            user.gamesPlayed++;
            this.UserService.updateSession(user)
            this.PlayerResource.update({ id: user.id }, user);
        }

        public updateGamesWon(user: Models.UserModel): void {
            user.gamesWon++;
            //console.log(user);
            this.UserService.updateSession(user)
            this.PlayerResource.update({ id: user.id }, user);
        }

        public updateNavColor(user: Models.UserModel, color: string) {
            //console.log(color)
            user.navBarColor = color;
            
            this.PlayerResource.update({ id: user.id }, user);
            //console.log(user.navBarColor)
        }

        public updateBackgroundColor(user: Models.UserModel, color: string) {
            user.backgroundColor = color;
            this.PlayerResource.update({ id: user.id }, user);
        }


        public getUserScores(): ng.IPromise<Models.UserModel[]> {

            return this.PlayerResource.query().$promise;
            //   let score = this.PlayerResource.query().$promise;
            //  console.log(score);
            //  return score;

        }



    }
    interface IAppUserResourceClass extends IUpdatableResourceClass<Models.UserModel> {

    }

    interface IUpdatableResourceClass<T> extends ng.resource.IResourceClass<T> {

        update(): T;
        update(params: Object): T;
        update(success: Function, error?: Function): T;
        update(params: Object, sucess: Function, error?: Function): T;
        update(params: Object, data: Object, success?: Function, error?: Function): T;
    }
}