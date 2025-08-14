import { StyleSheet } from "@react-pdf/renderer";

const blue = "#1e5aa6";
const gray = "#f5f5f5";
const borderGray = "#d9d9d9";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#000",
  },

  // ===== Company Header =====
  companySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: blue,
  },
  bankText: { fontWeight: "bold" },

  // ===== Employee Info =====
  employeeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 10,
    paddingBottom: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: borderGray,
  },
  infoText: { marginBottom: 2, fontSize: 9 },

  // Nett Pay box
  netPayBox: {
    // borderWidth: 1,
    // borderColor: borderGray,
    padding: 6,
    // backgroundColor: gray,
    marginTop: 4,
    alignItems: "center",
  },
  netPayLabel: { fontSize: 8, marginBottom: 2 },
  netPayValue: { fontSize: 10, fontWeight: "bold", color: blue },

  // ===== Tables =====
  tableSection: {
    marginTop: 10,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: borderGray,
    borderRadius: 4.5,
  },
  tableHeader: {
    backgroundColor: blue,
    flexDirection: "row",
  },
  headerCell: {
    flex: 1,
    padding: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 9,
  },
  row: {
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderTopColor: borderGray,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 9,
  },
  totalRow: {
    flexDirection: "row",
    // backgroundColor: gray,
    fontWeight: "bold",
  },

  // ===== Footer =====
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 8,
    color: "#777",
  },

   header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  EmployeeLeft: {
    flex: 1,
    paddingRight: 10,
  },
  EmployeeRight: {
    flex: 1,
    paddingLeft: 10,
    alignItems: "flex-end",
  },
});

export default styles;