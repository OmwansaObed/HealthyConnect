// app/api/contact/[id]/route.js
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Contact from "../../../../models/Contact";

/**
 * GET /api/contact/[id]
 * Get a specific contact message by ID
 */
export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact/[id]
 * Update a contact message (mark as read, change status, etc.)
 */
export async function PATCH(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const { action, status, notes } = body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    let updateData = {};

    switch (action) {
      case "markAsRead":
        // Use your existing method
        await contact.markAsRead();
        const updatedContact = await Contact.findById(id);

        return NextResponse.json(
          {
            success: true,
            message: "Contact marked as read successfully",
            data: updatedContact,
          },
          { status: 200 }
        );

      case "markAsUnread":
        updateData = {
          isRead: false,
          status: "pending",
        };
        break;

      case "updateStatus":
        if (!status) {
          return NextResponse.json(
            {
              success: false,
              message: "Status is required for updateStatus action",
            },
            { status: 400 }
          );
        }

        const validStatuses = ["pending", "read", "replied", "resolved"];
        if (!validStatuses.includes(status)) {
          return NextResponse.json(
            { success: false, message: "Invalid status" },
            { status: 400 }
          );
        }

        updateData = { status };

        // If marking as read, also set isRead to true
        if (
          status === "read" ||
          status === "replied" ||
          status === "resolved"
        ) {
          updateData.isRead = true;
        }
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
    }

    // Update the contact (for cases other than markAsRead)
    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Contact ${action} successfully`,
        data: updatedContact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact/[id]
 * Delete a contact message (soft delete recommended)
 */
export async function DELETE(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    // Soft delete - add isDeleted field to your model if you want this feature
    const deletedContact = await Contact.findByIdAndUpdate(
      id,
      {
        status: "resolved", // Change status to resolved instead of deleting
      },
      { new: true }
    );

    // For hard delete, use: await Contact.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Contact message resolved successfully",
        data: { id: deletedContact._id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
