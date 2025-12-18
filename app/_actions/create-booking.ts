"use server";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { isBefore } from "date-fns";
import { headers } from "next/headers";
import { z } from "zod";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const currentDate = new Date();
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }
    // verificar se já existe agendamento para essa data
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      console.error("Já existe um agendamento para essa data.");
      returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para essa data."],
      });
    }
    if (isBefore(date, currentDate)) {
      returnValidationErrors(inputSchema, {
        _errors: ["Data Inválida!"],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: session.user.id,
        barbershopId: service.barbershopId,
      },
    });
    return booking;
  });
