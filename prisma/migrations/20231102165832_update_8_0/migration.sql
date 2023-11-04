/*
  Warnings:

  - A unique constraint covering the columns `[fromUserId,toUserId]` on the table `UserFollows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFollows_fromUserId_toUserId_key" ON "UserFollows"("fromUserId", "toUserId");
