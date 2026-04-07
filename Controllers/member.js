const Member = require('../Modals/member');
const Membership = require('../Modals/membership')

exports.getAllMember = async (req, res) => {
    try {
        const filter = { gym: req.gym._id };

        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 0;

        const totalMember = await Member.countDocuments(filter);

        let query = Member.find(filter)
            .populate('membership')
            .sort({ joiningDate: -1 });

        if (limit > 0) {
            query = query.skip(skip).limit(limit);
        }

        const members = await query;

        res.status(200).json({
            message: members.length ? "Members fetched successfully" : "No members found",
            members,
            totalMembers: totalMember
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


function addMonthsToDate(months, joiningDate) {

    // Get current year, month, and day
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Months are 0-indexed
    const currentDay = today.getDate();

    // Calculate the new month and year
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);

    // Calculate the correct future month (modulus for month)
    const adjustedMonth = futureMonth % 12;

    // Set the date to the first of the future month
    const futureDate = new Date(futureYear, adjustedMonth, 1);

    // Get the last day of the future month
    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();

    // Adjust the day if current day exceeds the number of days in the new month
    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

    // Set the final adjusted day
    futureDate.setDate(adjustedDay);

    return futureDate;
}



exports.registerMember = async (req, res) => {
    try {
        const { name, mobileNo, address, membership, profilePic, joiningDate } = req.body;
        const member = await Member.findOne({ gym: req.gym._id, mobileNo });
        if (member) {
            return res.status(409).json({ error: 'Already registered with this Mobile No' });
        }

        const memberShip = await Membership.findOne({ _id: membership, gym: req.gym._id });
        if (memberShip) {
            const membershipMonth = memberShip.months;
            const nextBillDate = addMonthsToDate(membershipMonth, new Date(joiningDate));

            const newMember = new Member({
                name,
                mobileNo,
                address,
                membership,
                gym: req.gym._id,
                profilePic,
                nextBillDate,
                joiningDate: new Date(joiningDate),
                lastPayment: new Date(joiningDate)
            });

            await newMember.save();
            res.status(201).json({ message: "Member registered successfully", member: newMember });

        } else {
            return res.status(409).json({ error: "No such Membership are there" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}



exports.searchMember = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const members = await Member.find({
            gym: req.gym._id,
            $or: [
                { name: { $regex: '^' + searchTerm, $options: 'i' } },
                { mobileNo: { $regex: '^' + searchTerm, $options: 'i' } }
            ]
        }).populate('membership').sort({ joiningDate: -1 });

        res.status(200).json({
            message: members.length ? "Fetched Member Successfully" : "No Such members Registered yet",
            members,
            totalMembers: members.length
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.monthlyMember = async (req, res) => {
    try {
        const now = new Date();

        //  Get the first day of the current month (e.g., 2024-11-30 00:00:00)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Get the last day of the current month (e.g., 2024-09-30 23:59:59)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const member = await Member.find({
            gym: req.gym._id,
            joiningDate: {
                $gte: startOfMonth,  // Greater than or equal to the first day of the month
                $lte: endOfMonth     // Less than or equal to the last day of the month
            }
        }).sort({ joiningDate: -1 });

        res.status(200).json({
            message: member.length ? "Fetched Members SuccessFully" : "No Such Member Registered yet",
            members: member,
            totalMembers: member.length
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.expiringWithin3Days = async (req, res) => {
    try {
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);
        nextThreeDays.setHours(23, 59, 59, 999); // End of the 3rd day

        const member = await Member.find({
            gym: req.gym._id,
            nextBillDate: { 
                $gt: today, 
                $lte: nextThreeDays 
            },
            status: "Active"
        }).populate('membership');

        res.status(200).json({ 
            message: member.length ? "Fetched members Successfully" : "No Such members is expiring within 3 days", 
            members: member,
            totalMembers: member.length
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


exports.expiringWithIn4To7Days = async (req, res) => {
    try {
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);
        nextThreeDays.setHours(23, 59, 59, 999);

        const nextSevenDays = new Date();
        nextSevenDays.setDate(today.getDate() + 7);
        nextSevenDays.setHours(23, 59, 59, 999);

        const member = await Member.find({
            gym: req.gym._id,
            nextBillDate: { 
                $gt: nextThreeDays, // Start after the end of within-3-days range
                $lte: nextSevenDays  
            },
            status: "Active"
        }).populate('membership');

        res.status(200).json({
            message: member.length ? "Fetched members Successfully" : "No Such members is expiring within 4-7 days",
            members: member,
            totalMembers: member.length
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


exports.expiredMember = async (req, res) => {
    try {
        const today = new Date();
        const member = await Member.find({
            gym: req.gym._id,
            nextBillDate: { 
                $lte: today 
            },
            status: "Active"
        }).populate('membership');

        res.status(200).json({
            message: member.length ? "Fetched members Successfully" : "No Such members has been expired",
            members: member,
            totalMembers: member.length 
        });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


exports.inActiveMember = async (req, res) => {
    try {
        const member = await Member.find({
            gym: req.gym._id,
            status: "InActive"
        }).populate('membership');

          res.status(200).json({
            message: member.length ? "Fetched members Successfully" : "No Such members is inactive",
            members: member,
            totalMembers: member.length 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}


exports.getMemberDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findOne({ _id: id, gym: req.gym._id }).populate('membership');
        if (!member) {
            return res.status(404).json({ 
                error: "Member not found"
            });
        }
        res.status(200).json({
            message: "Member details fetched",
            member:member
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if (!member) {
            return res.status(404).json({ 
                error: "Member not found" 
            });
        }
        member.status = status;
        await member.save();
        res.status(200).json({ 
            message: "Status changed successfully" 
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.updateMemberPlan = async (req, res) => {
    try {
        const { membership } = req.body;
        const { id } = req.params;
        const memberShip = await Membership.findOne({ gym: req.gym._id, _id: membership });
        if (memberShip) {
            let getMonth = memberShip.months;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonth, today);
            const member = await Member.findOneAndUpdate({ gym: req.gym._id, _id: id }, { membership, nextBillDate, status: "Active" }, { new: true });
            if (!member) {
                return res.status(409).json({ error: "Member not found" });
            }
            res.status(200).json({ message: "Member plan updated and status set to Active", member });

        } else {
            return res.status(409).json({ error: "No such Membership are there" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.getDashboardStats = async (req, res) => {
    try {
        const gymId = req.gym._id;
        const now = new Date();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const nextThreeDays = new Date();
        nextThreeDays.setDate(now.getDate() + 3);
        nextThreeDays.setHours(23, 59, 59, 999);

        const nextSevenDays = new Date();
        nextSevenDays.setDate(now.getDate() + 7);
        nextSevenDays.setHours(23, 59, 59, 999);

        const [
            totalMembers,
            monthlyJoined,
            expiringSoon3Days,
            expiringSoon7Days,
            expiredMembers,
            inactiveMembers
        ] = await Promise.all([
            Member.countDocuments({ gym: gymId }),
            Member.countDocuments({ gym: gymId, joiningDate: { $gte: startOfMonth, $lte: endOfMonth } }),
            Member.countDocuments({ gym: gymId, nextBillDate: { $gt: now, $lte: nextThreeDays }, status: "Active" }),
            Member.countDocuments({ gym: gymId, nextBillDate: { $gt: nextThreeDays, $lte: nextSevenDays }, status: "Active" }),
            Member.countDocuments({ gym: gymId, nextBillDate: { $lte: now }, status: "Active" }),
            Member.countDocuments({ gym: gymId, status: "InActive" })
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalMembers,
                monthlyJoined,
                expiringSoon3Days,
                expiringSoon7Days,
                expiredMembers,
                inactiveMembers
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}