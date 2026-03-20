const express = require("express")
const router = express.Router();
const MemberController = require('../Controllers/member');
const auth = require('../Auth/auth')

router.get('/all-member', auth, MemberController.getAllMember);
router.post('/register-member', auth, MemberController.registerMember);

// original search route
router.get('/searched-members', auth, MemberController.searchMember);
// alias to match frontend endpoint `/members/search-member`
router.get('/searched-member', auth, MemberController.searchMember);
router.get('/monthly-member',auth, MemberController.monthlyMember);
router.get('/within-3-days-expiring', auth , MemberController.expiringWithin3Days);
router.get('/within-4-7-expiring', auth, MemberController.expiringWithIn4To7Days);
router.get('/expired-member', auth , MemberController.expiredMember);
router.get('/inactive-member', auth , MemberController.inActiveMember);

// route to get single member details, used by MemberDetail page
router.get('/get-member-details/:id', auth, MemberController.getMemberDetails);

// support both POST and PUT for status change to match frontend
router.post('/change-status/:id', auth, MemberController.changeStatus);
router.put('/change-status/:id', auth, MemberController.changeStatus);

// support both PUT and POST for plan update to match frontend
router.put('/update-member-plan/:id', auth, MemberController.updateMemberPlan);
router.post('/update-member-plan/:id', auth, MemberController.updateMemberPlan);

module.exports = router;