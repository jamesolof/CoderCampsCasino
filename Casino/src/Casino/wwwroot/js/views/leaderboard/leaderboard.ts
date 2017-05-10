namespace Casino.Views.LeaderBoard {
    let module: ng.IModule = angular.module('View.LeaderBoard', []);

    module.controller('LeaderBoardController', LeaderBoard.LeaderBoardController);
    module.config(LeaderBoard.Configuration);
}