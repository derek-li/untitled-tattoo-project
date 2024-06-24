-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileImageUrl" TEXT NOT NULL,
    "isBookingOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forms" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "formFields" JSONB,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Forms_userId_key" ON "Forms"("userId");

-- AddForeignKey
ALTER TABLE "Forms" ADD CONSTRAINT "Forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
