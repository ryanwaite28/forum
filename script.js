// Main Angular Application
var App = angular.module("myApp", []);

// Master Angular Controller
App.controller('masterCtrl', function($scope) {

	$scope.feed = [];

	$scope.addPost = function() {

		// console.log('Adding Post...');

		var userName = $('#newpost-username').val();
		var textBody = $('#newpost-textbody').val();
		var date = Date();

		if( userName == '' || textBody == '' ) {
			$scope.msg1 = 'Please fill in both fields.';
			setTimeout( function() {
				$scope.msg1 = '';
				$scope.$apply();
			} , 3000 );
			return;
		}

		$scope.feed.push({
			userName : userName,
			textBody : textBody,
			postDate : date,
			lastEdited : 'No Prior Edits'
		})

		$('#newpost-username').val('');
		$('#newpost-textbody').val('');

		// console.log('Post Added.');
		$scope.msg1 = 'Post Added!';
		setTimeout( function() {
			$scope.msg1 = '';
			$scope.$apply();
		} , 3000 );

	}

	$scope.openEditor = function(post) {

		document.getElementById("edit-modal").showModal();

		$scope.currentUserName = post.userName;

		$('#editpost-textbody').val(post.textBody);

		$scope.editPost = function() {

			var editedText = $('#editpost-textbody').val();

			if( editedText == '' ) {
				$scope.msg2 = 'Please fill in the field with text.';
				setTimeout( function() {
					$scope.msg2 = '';
					$scope.$apply();
				} , 3000 );
				return;
			}

			post.textBody = editedText;
			post.lastEdited = Date();

			document.getElementById("edit-modal").close();

			$scope.msg1 = 'Post Updated!';
			setTimeout( function() {
				$scope.msg1 = '';
				$scope.$apply();
			} , 3000 );

			return post;

		}

	}

	$scope.closeEditPost = function() {

		document.getElementById("edit-modal").close();
		//$('#edit-modal').attr(open , false);

	}

	$scope.deletePost = function(post) {

		// console.log(post);
		// console.log('Deleting Post...');

		var index = $scope.feed.indexOf(post);
		console.log(index);

		if( index != -1 ) {

			var ask = confirm('Are You Sure You Want To Delete This Post?');

			if( ask == true ) {
				$scope.feed.splice(index , 1);
			}
			if( ask == false ) {
				return;
			}

		}
		if( index == -1 ) {

			return;

		}

		// console.log('Post Deleted.');
		$scope.msg1 = 'Post Deleted!';
		setTimeout( function() {
			$scope.msg1 = '';
			$scope.$apply();
		} , 3000 );

	}

});
