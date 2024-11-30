import PropTypes from "prop-types";
import Roboto_Light from "/fonts/Roboto-Light.ttf";
import Roboto_Black from "/fonts/Roboto-Black.ttf";
import { getCurrentDate } from "@/lib/functions";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/functions";
import { Fragment } from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";

export default function ReceiptPrint({ data }) {
  const {
    or_date,
    or_no,
    order: { OrderBreakDown },
    s_name,
    s_no,
    s_program,
    total,
  } = data;
  Font.register({
    family: "R_Light",
    src: Roboto_Light,
    fontWeight: "normal",
  });

  Font.register({
    family: "R_Black",
    src: Roboto_Black,
    fontWeight: "normal",
  });
  const styles = StyleSheet.create({
    page: {
      fontFamily: "R_Light",
      paddingTop: 30,
      paddingHorizontal: 30,
    },
    title: {
      fontFamily: "R_Black",
      fontSize: 10,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 10,
    },
    value: {
      fontFamily: "R_Light",
      fontSize: 10,
      textAlign: "left",
    },
    footer: {
      fontFamily: "R_Light",
      fontSize: 10,
      textAlign: "right",
      fontWeight: "bold",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>STI Fairview Proware</Text>
        <Text style={styles.title}>#70 Regalado Avenue, North Fairview, Quezon City, 1121 Metro Manila</Text>
        <Text style={styles.title}>Proware Order</Text>
        <Text style={styles.title}>{format(or_date, "MMMM dd, y")}</Text>
        <Text style={styles.title}>Order ID {or_no}</Text>
        <Text style={styles.title}>Student Name: {s_name}</Text>
        <Text style={styles.title}>Student ID: {s_no}</Text>
        <Text style={styles.title}>Program: {s_program}</Text>
        <Text style={styles.title}>Order Breakdown</Text>
        {OrderBreakDown.map((orderBreakDown) => (
          <Fragment key={orderBreakDown.ProductAttributeID}>
            <Text style={styles.value}>
              {`${orderBreakDown.ProductName} ${orderBreakDown.ProductSize} ${orderBreakDown.ProductVariant} `}
            </Text>
            <Text style={styles.value}>
              {`${formatCurrency(orderBreakDown.ProductPrice)} x ${orderBreakDown.OrderQuantity} = ${formatCurrency(orderBreakDown.OrderTotal)}`}
            </Text>
          </Fragment>
        ))}
        <Text style={styles.footer}>Overall Total Amount: {formatCurrency(total)}</Text>
      </Page>
    </Document>
  );
}
ReceiptPrint.propTypes = {
  data: PropTypes.object,
};
