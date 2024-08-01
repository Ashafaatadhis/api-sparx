import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
prisma.$use(async (params: any, next) => {
  if (
    params.action === "findMany" ||
    params.action === "findFirst" ||
    params.action === "findUnique" ||
    params.action === "findCount"
  ) {
    // Tambahkan filter untuk mengambil data yang belum dihapus (deletedAt = null)
    params.args = params.args || {};
    params.args.where = params.args.where || {};
    // Tambahkan filter untuk mengambil data yang belum dihapus (deletedAt = null)
    params.args.where.deletedAt = null;
  }
  if (params.action == "delete") {
    // Delete queries
    // Change action to an update
    params.action = "update";
    params.args["data"] = { deletedAt: new Date().toISOString() };
  }
  if (params.action == "deleteMany") {
    // Delete many queries
    params.action = "updateMany";
    if (params.args.data != undefined) {
      params.args.data["deletedAt"] = new Date().toISOString();
    } else {
      params.args["data"] = { deletedAt: new Date().toISOString() };
    }
  }

  return next(params);
});
export default prisma;
