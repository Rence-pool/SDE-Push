import PropTypes from "prop-types";
import Roboto_Light from "/fonts/Roboto-Light.ttf";
import Roboto_Black from "/fonts/Roboto-Black.ttf";
import { getCurrentDate } from "@/lib/functions";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

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
    overflow: "hidden",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontSize: 5,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 5,
  },
  tableCol: {
    flex: 1,
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
    flexWrap: "wrap",
    fontSize: 5,
    wordWrap: "break-word",
  },
  tableHeader: {
    margin: "auto",
    fontWeight: "normal",
    fontFamily: "R_Black",
    wordWrap: "break-word",
    fontSize: 5,
  },
});

// Create Document Component
export default function DynamicTableToPrintPDF({ data, columns, title, date = getCurrentDate() }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>STI Fairview Proware</Text>
        <Text style={styles.title}>#70 Regalado Avenue, North Fairview, Quezon City, 1121 Metro Manila</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{date}</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {columns.map((column, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableHeader}>{column.accessorKey}</Text>
              </View>
            ))}
          </View>
          {data.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              {columns.map((column) => (
                <View style={styles.tableCol} key={`${column.accessorKey}-${index}`}>
                  <Text style={styles.tableCell}>{row[column.accessorKey]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

DynamicTableToPrintPDF.propTypes = {
  data: PropTypes.array,
  currentDate: PropTypes.string,
  columns: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
};
