exports.getAdminStaff = async (req, res) => {
  const adminId = Number(req.params.adminId);
  try {
    const staff = await prisma.staff.findMany({
      where: { admin_id: adminId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
      },
    });

    res.status(200).json({ staff });
  } catch (error) {
    console.error("Get admin staff error:", error);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};
