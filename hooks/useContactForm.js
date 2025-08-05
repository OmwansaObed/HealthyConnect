"use client";
import { useState } from "react";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "professional",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters";
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject cannot exceed 200 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const submitForm = async () => {
    // Reset previous status
    setSubmitStatus(null);

    // Validate form
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          userType: "professional",
        });
        setErrors({});
        return true;
      } else {
        setSubmitStatus("error");
        // Handle validation errors from server
        if (result.errors) {
          setErrors(result.errors);
        }
        return false;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      userType: "professional",
    });
    setErrors({});
    setSubmitStatus(null);
  };

  // Clear status messages
  const clearStatus = () => {
    setSubmitStatus(null);
    setErrors((prev) => ({ ...prev, submit: undefined }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    submitForm,
    resetForm,
    clearStatus,
    // Utility getters
    hasErrors: Object.keys(errors).length > 0,
    isFormValid:
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim(),
  };
};
