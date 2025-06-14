// src/components/Customer.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Utility: format date as "30 Mar 2025 at 02:07 pm"
const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  const dt = new Date(isoString);
  // Date part: e.g., "30 Mar 2025"
  const datePart = dt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // Time part: "02:07 pm"
  const timePart = dt.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
  return `${datePart} at ${timePart}`;
};

const formatCurrency = (amount, currency) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
  }).format(num);
};

const getInitials = (firstName, lastName) => {
  const a = firstName?.trim() || "";
  const b = lastName?.trim() || "";
  const initials = (a.charAt(0) || "") + (b.charAt(0) || "");
  return initials.toUpperCase() || "?";
};

const Customer = ({ data }) => {
  const theme = useTheme();
  if (!data) return null;

  const {
    id,
    email,
    created_at,
    updated_at,
    first_name,
    last_name,
    orders_count,
    total_spent,
    state,
    last_order_name,
    currency,
    phone,
    tags,
    verified_email,
    addresses = [],
    default_address,
    email_marketing_consent,
    sms_marketing_consent,
  } = data;

  const fullName = [first_name, last_name].filter(Boolean).join(" ") || "N/A";

  // Determine status chip color
  let statusColor = "default";
  if (state === "enabled" || state === "active") {
    statusColor = "success";
  } else if (state === "disabled" || state === "blocked") {
    statusColor = "error";
  }
  const statusLabel = state
    ? state.charAt(0).toUpperCase() + state.slice(1)
    : "Unknown";

  // Parse tags into array
  const tagList =
    typeof tags === "string" && tags.length
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        mb: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "#fff",
            }}
          >
            {getInitials(first_name, last_name)}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="div">
            {fullName}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Customer ID: {id}
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          {/* Left column: Contact & Status */}
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {/* Email */}
              <Box display="flex" alignItems="center">
                <EmailIcon
                  fontSize="small"
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" noWrap>
                  {email || "N/A"}
                </Typography>
                {verified_email && (
                  <Chip
                    label="Verified"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>

              {/* Phone */}
              <Box display="flex" alignItems="center">
                <PhoneIcon
                  fontSize="small"
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  {phone || "N/A"}
                </Typography>
              </Box>

              {/* Status */}
              <Box display="flex" alignItems="center">
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Status:
                </Typography>
                <Chip
                  label={statusLabel}
                  size="small"
                  color={statusColor}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Right column: Orders & Spending */}
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <ShoppingCartIcon
                  fontSize="small"
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  Orders: {orders_count != null ? orders_count : "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <MonetizationOnIcon
                  fontSize="small"
                  color="action"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  Total Spent: {formatCurrency(total_spent, currency)}
                </Typography>
              </Box>
              {last_order_name && (
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">
                    Last Order:{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {last_order_name}
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Created / Updated */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon
                fontSize="small"
                color="action"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2">
                Created: {formatDateTime(created_at)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon
                fontSize="small"
                color="action"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2">
                Updated: {formatDateTime(updated_at)}
              </Typography>
            </Box>
          </Grid>

          {/* Marketing Consent */}
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                Email Marketing Consent
              </Typography>
              <Typography variant="body2">
                State:{" "}
                <Typography
                  component="span"
                  variant="body2"
                  color={
                    email_marketing_consent?.state === "subscribed"
                      ? "success.main"
                      : "text.primary"
                  }
                >
                  {email_marketing_consent?.state || "N/A"}
                </Typography>
              </Typography>
              {email_marketing_consent?.consent_updated_at && (
                <Typography variant="body2">
                  Updated:{" "}
                  {formatDateTime(email_marketing_consent.consent_updated_at)}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                SMS Marketing Consent
              </Typography>
              <Typography variant="body2">
                State:{" "}
                <Typography
                  component="span"
                  variant="body2"
                  color={
                    sms_marketing_consent?.state === "subscribed"
                      ? "success.main"
                      : "text.primary"
                  }
                >
                  {sms_marketing_consent?.state || "N/A"}
                </Typography>
              </Typography>
              {sms_marketing_consent?.consent_updated_at && (
                <Typography variant="body2">
                  Updated:{" "}
                  {formatDateTime(sms_marketing_consent.consent_updated_at)}
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Tags */}
          {tagList.length > 0 && (
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {tagList.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Grid>
          )}

          {/* Addresses */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Addresses
            </Typography>
            <List disablePadding>
              {addresses.length > 0 ? (
                addresses.map((addr) => {
                  const isDefault =
                    default_address && addr.id === default_address.id;
                  // Build address line: name • address1 • city, province, zip • country
                  const parts = [
                    addr.name,
                    addr.address1,
                    addr.address2,
                    [addr.city, addr.province, addr.zip]
                      .filter(Boolean)
                      .join(", "),
                    addr.country_name,
                  ].filter(Boolean);
                  const addrText = parts.join(" • ");
                  return (
                    <React.Fragment key={addr.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.secondary }}>
                          <LocationOnIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center">
                              <Typography
                                variant="body2"
                                sx={{ wordBreak: "break-word" }}
                              >
                                {addrText || "N/A"}
                              </Typography>
                              {isDefault && (
                                <Chip
                                  label="Default"
                                  size="small"
                                  color="primary"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText primary="No addresses on file." />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Customer;
