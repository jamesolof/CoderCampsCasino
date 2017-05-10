//namespace Casino.Views.Friends {
//    Configuration.$inject = [

//        '$stateProvider'
//    ];

//    export function Configuration(
//        $stateProvider: ng.ui.IStateProvider
//    ) {
//        $stateProvider.state('Friends', <ng.ui.IState>{
//            url: '/friends',
//            templateUrl: 'js/views/friends/friends.view.html',
//            controller: 'FriendsController',
//            controllerAs: 'vm',
//            resolve:
//            {
//                friends: function (UserService) {
//                    return UserService.getAllUsers();
//                }
//            }
//        });
//    }
//}