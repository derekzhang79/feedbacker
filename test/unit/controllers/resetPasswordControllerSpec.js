'use strict';

describe('edit reset password controller [ResetCtrl]', function() {

	var scope, resetController, account, location;
	var deferred;

	beforeEach(module('feedbacker'));

    // define the mock person and relationship services
    beforeEach(inject(function($rootScope, $q, $controller, _Account_, $location) {
		scope = $rootScope.$new();

		deferred = $q.defer();

    	account = _Account_;
        spyOn(account, 'sendPasswordResetEmail').and.returnValue(deferred.promise);
        spyOn(account, 'sendActivationEmail').and.returnValue(deferred.promise);
        spyOn(account, 'resetPassword').and.returnValue(deferred.promise);

        location = $location;
        spyOn(location, "search").and.returnValue({"username":"a@b.co", "token":"abcdefghij"});
        spyOn(location, "path");

		resetController = $controller('ResetCtrl',{$scope: scope });
	}));

    describe('has valid intiatialisation values', function() {

    	it('should define functions', function() {
            expect(angular.isFunction(resetController.sendPasswordResetEmail)).toBe(true);
            expect(angular.isFunction(resetController.sendActivationEmail)).toBe(true);
            expect(angular.isFunction(resetController.resetPassword)).toBe(true);
    	});

    	it('for global controller variables', function() {
            expect(resetController).toBeDefined();
            expect(resetController.message).not.toBeDefined();
            expect(resetController.error).not.toBeDefined();
    	});

	});

	describe('send password reset email', function() {

	    it('should set a success message when reset email sent', function() {

	        resetController.sendPasswordResetEmail("test");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.resolve();
            scope.$digest();

            expect(resetController.message).toEqual("Password reset email sent.");
            expect(resetController.error).not.toBeDefined();
	    });

	    it('should set an error message when reset email fail', function() {

	        resetController.sendPasswordResetEmail("test");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.reject();
            scope.$digest();

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toEqual("Could not send password reset email.  Please try again later.");
	    });

	    it('should reset ctrl messages when email sent', function() {
	        resetController.message = "some";
	        resetController.error = "value";

	        resetController.sendPasswordResetEmail("thing");

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toBeUndefined();
	    });
	});

	describe('send activation email', function() {

	    it('should set a success message when email sent', function() {

	        resetController.sendActivationEmail("test");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.resolve();
            scope.$digest();

            expect(resetController.message).toEqual("Account activation email sent.");
            expect(resetController.error).not.toBeDefined();
	    });

	    it('should set an error message when reset email fail', function() {

	        resetController.sendActivationEmail("test");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.reject();
            scope.$digest();

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toEqual("Could not send account activation email.  Please try again later.");
	    });

	    it('should reset ctrl messages when email sent', function() {
	        resetController.message = "some";
	        resetController.error = "value";

	        resetController.sendActivationEmail("thing");

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toBeUndefined();
	    });
	});

	describe('reset password', function() {

        it('should update location when password reset', function() {

            resetController.resetPassword("testtest", "testtest");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.resolve();
            scope.$digest();

            expect(location.search).toHaveBeenCalled();
            expect(account.resetPassword).toHaveBeenCalledWith("testtest", "abcdefghij", "a@b.co");
            expect(resetController.message).toEqual("Password successfully updated.");
            expect(resetController.error).not.toBeDefined();
        });

        it('should set an error message when reset email fail', function() {

            resetController.resetPassword("testtest", "testtest");

            expect(resetController.message).toBeUndefined(); // it really should at this point
            deferred.reject();
            scope.$digest();

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toEqual("Could not reset your password.  Please try again later.");
        });

        it('should ensure passwords match', function() {

            resetController.resetPassword("some", "value");

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toEqual("Passwords must match.");
        });

        it('should check for token', function() {
            location.search.and.returnValue({});

            resetController.resetPassword("test", "test");

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toEqual("Invalid credentials. Unable to reset your password.");
        });

        it('should reset ctrl messages resetting email', function() {
            resetController.message = "some";
            resetController.error = "value";

            resetController.resetPassword("eightchar", "eightchar");

            expect(resetController.message).toBeUndefined();
            expect(resetController.error).toBeUndefined();
        });
	});
});
