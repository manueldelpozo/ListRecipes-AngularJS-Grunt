var myGlobal;
beforeEach(function() {
    // This will run before any it function.
    // Resetting a global state so the change in this function is testable
   myGlobal = 10
});