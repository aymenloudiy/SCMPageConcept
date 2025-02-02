import { sequelize } from "./database";
import { User } from "./models/test";

const testDB = async () => {
  try {
    await sequelize.sync();

    const newUser = await User.create({
      name: "Mr sandman",
      email: "mrsandman@sandman.com",
    });

    console.log("User created:", newUser.toJSON());

    const users = await User.findAll();
    console.log(
      "All Users:",
      users.map((user) => user.toJSON())
    );
  } catch (error) {
    console.error("Error testing database:", error);
  } finally {
    await sequelize.close();
  }
};

testDB();
