'use strict';

describe('service [Nomination]', function() {
	
	var nomination, $httpBackend;

    beforeEach(module('feedbacker.services'));
    
    beforeEach(inject(function(_Nomination_, _$httpBackend_) {

    	nomination = _Nomination_;
    	$httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
    
    it('can get an instantce of itself', function(){
    	expect(nomination).toBeDefined();
    });
    
    it('has defined functions', function() {
        expect(angular.isFunction(nomination.getCurrentNominations)).toBe(true);
        expect(angular.isFunction(nomination.addNomination)).toBe(true);
        expect(angular.isFunction(nomination.cancelNomination)).toBe(true);
    });

    describe("calls the appropriate server api", function() {
        var dummyResult = "dummyResult";
    	
    	it('to retrieve current nomination list', function() {
    		var result, promise = nomination.getCurrentNominations();

            $httpBackend.expectGET('/api/nominations').respond(200, dummyResult);
    		
    		// set the response value
    		promise.then(function(data) {
    			result = data.data;
    		});
    		expect(result).toBeUndefined(); // it really should at this point
    		$httpBackend.flush();

    		expect(result).toBeDefined();
            expect(result).toEqual(dummyResult);
    	});
    });
});