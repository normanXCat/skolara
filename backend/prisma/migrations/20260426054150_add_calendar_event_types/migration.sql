-- CreateTable
CREATE TABLE "calendar_event_types" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "calendar_event_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "calendar_event_types_value_key" ON "calendar_event_types"("value");
