import PropTypes from "prop-types";
import Roboto_Light from "/fonts/Roboto-Light.ttf";
import Roboto_Black from "/fonts/Roboto-Black.ttf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
// Create styles
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
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontSize: 5,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    fontSize: 5,
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5,
  },
  tableCell: {
    margin: "auto",
    fontWeight: "normal",

    marginTop: 5,
    fontSize: 5,
  },
  tableHeader: {
    margin: "auto",
    fontWeight: "normal",
    fontFamily: "R_Black",

    fontSize: 5,
  },
});

// Create Document Component
const TableToPrint = ({ data, currentDate = "2021-01-01" }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>STI Fairview Proware Orders</Text>
        <Text style={styles.title}>
          #70 Regalado Avenue, North Fairview, Quezon City, 1121 Metro Manila
        </Text>
        <Text style={styles.title}>Orders Report</Text>
        <Text style={styles.title}>{currentDate}</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Order Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Student Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Student Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Program</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Order Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Status</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Sales</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Total</Text>
            </View>
          </View>
          {data.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.or_date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.s_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.s_name}</Text>
              </View>
              <View style={styles.tableCol}>
            
                <Text style={styles.tableCell}>{row.s_program[0]}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.or_no}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.status}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.sales}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.total}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array,
  currentDate: PropTypes.string,
};
export default TableToPrint;
