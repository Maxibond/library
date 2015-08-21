var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('libraryController', function ($scope){
    $scope.books = [];
    $scope.books.push({
        name: "Война и мир. Толстой",
        category: "Художеств.",
        person: "Петров",
        end: "20 August, 2015"
    });
    $scope.books.push({
        name: "1Война и мир. Толстой",
        category: "Художеств.",
        person: "Петров",
        end: "15 August, 2015"
    });
    $scope.editBlockShow = false;
    $scope.countExpired = 0;

    $scope.checkExpired = function(book) {
      return Date.parse(book.end) < Date.now();
    };

    $scope.updateExpired = function() {
        $scope.countExpired = $scope.books.reduce(function (count, current) {
            console.log(Date.parse(current.end));
            if ( $scope.checkExpired(current) ) {
                count++;
                current.expired = true;
            }
            return count;
        }, 0);
    };

    $scope.updateExpired();

    $scope.showEdit = function(editBook){
        if ($scope.editBlockShow) $scope.cancelEdit();
        $scope.editBook = {};
        $scope.editBookIndex = $scope.books.indexOf(editBook);
        $scope.editBook = $scope.books.splice($scope.editBookIndex, 1)[0];
        $scope.backupBook = JSON.parse(JSON.stringify($scope.editBook));//copy
        $scope.editBlockShow = true;
    };

    $scope.saveEdit = function(){
        $scope.books.push($scope.editBook);
        $scope.editBlockShow = false;
        if ($scope.checkExpired($scope.editBook)) $scope.editBook.expired = true; // ?
        $scope.updateExpired(); //test
    };

    $scope.cancelEdit = function(){
        $scope.books.push($scope.backupBook);
        $scope.editBlockShow = false;
    };

    $scope.addBook = function(){
        $scope.books.push($scope.newBook);
        $scope.newBook = {};
    }
});
