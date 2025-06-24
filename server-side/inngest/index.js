const { Inngest } = require("inngest");
const User = require("../models/UserModal");

const inngest = new Inngest({ id: "movie-ticket-booking" });

//functions for user data to a database

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email.address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);

//inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

//inngest function to update user for database

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email.address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];

module.exports = {
  inngest,
  functions,
};
