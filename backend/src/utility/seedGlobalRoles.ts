import { prisma } from "#/db";

export async function seedGlobalRoles() {
  try {
    // Check if roles already exist
    const existingRoles = await prisma.globalRole.findMany();

    if (existingRoles.length === 0) {
      await prisma.globalRole.createMany({
        data: [
          {
            id: 1,
            name: "Owner",
            description: "Owner role with full permissions",
            isDefault: false,
          },
          {
            id: 2,
            name: "Admin",
            description: "Admin role with administrative permissions",
            isDefault: false,
          },
          {
            id: 3,
            name: "User",
            description: "Default user role with basic permissions",
            isDefault: true,
          },
        ],
      });

      console.log("Global roles initialized successfully");
      return true;
    } else {
      console.log("Global roles already exist, skipping initialization");
    }
  } catch (error) {
    console.error("Failed to seed global roles:", error);
    throw error;
  }
}

await seedGlobalRoles();