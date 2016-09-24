var informationControllers = angular.module('informationControllers', []);

informationControllers.controller('informationController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicModal',
  'informationService',
  'dataService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicModal,
    informationService,
    dataService
  )
  {
	  $scope.informations = informationService.list();
	  $scope.information = informationService.detail({id: $stateParams.id});
    $scope.datas = dataService.list();
    $scope.tags = {
      'Grey': 'grey',
      'Red':'red',
      'Yellow': 'yellow',
      'Blue': 'blue',
      'Orange': 'orange',
      'Green': 'green',
      'Purple': 'purple'
    };

	  $scope.create = function () {
      $scope.information.business = $rootScope.currentBusiness.id;
      $scope.information.owner = $rootScope.currentOwner;
	    informationService.create($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

	  $scope.update = function () {
	    informationService.update($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

	  $scope.delete = function () {
	    informationService.delete($scope.information);
	    $scope.informations = informationService.list();
	    $state.go('tab.information-list');
	  }

    $scope.information.datas = [];
    $scope.selectData = function(data) {
      $scope.information.data = data.name;
      $scope.information.datas.push(data.id);
    };

	  $scope.cancel = function () {
	    $state.go('tab.information-list');
	  }

    $scope.refresh = function () {
      $scope.informations = informationService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/information/select-data.html', {
      scope: $scope,
      controller: 'informationCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.dataModal = modal;
    });
    $scope.dataOpenModal = function() {
      $scope.dataModal.show();
    };
    $scope.dataCloseModal = function() {
      $scope.dataModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.dataModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('dataModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('dataModal.removed', function() {
      // Execute action
    });

    $scope.$on('$stateChangeSuccess', function() {
      $scope.informations = informationService.list();
    })

	}
]);
