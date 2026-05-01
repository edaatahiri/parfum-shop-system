const prisma = require("../config/db"); // nese file eshte ne root

const logAction = async ({
  userId,
  action,
  entity,
  entityId,
  oldData,
  newData,
}) => {
  try {
    await prisma.auditLogs.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        oldData,
        newData,
      },
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};

module.exports = logAction;