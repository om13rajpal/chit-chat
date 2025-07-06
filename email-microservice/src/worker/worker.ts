import { Worker } from "bullmq";
import { transporter } from "../config/mail.config";
import { mailOptions } from "../utils/mail.utils";
import redis from "../config/redis.config";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { username, email } = job.data;
    try {
      await transporter.sendMail(mailOptions(email, username));
    } catch (error) {
      console.error("Error sending the mail", error);
      throw error;
    }
  },
  { connection: redis }
);

worker.on("failed", (job, err) => {
  console.error(
    `Job ${job?.id} failed with ${job?.attemptsMade} attempts`,
    err
  );
});
