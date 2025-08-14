import { StyleSheet } from "@react-pdf/renderer";

const blue = "#1d4ed8"; // blue-700
const lightBlue = "#2563eb"; // blue-600
const grayBg = "#e5e7eb"; // gray-200
const grayText = "#374151"; // gray-700
const borderGray = "#d9d9d9";
const wrapperGray = "#9ca3af"; // gray-400

const styles = StyleSheet.create({
  // ===== Page Wrapper =====
  page: {
    backgroundColor: wrapperGray,
    // padding: 20,
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Helvetica",
    fontSize: 10,
    // color: "#000",
  },

  // ===== PDF Container =====
  pdfContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#fff",
    width: 595,
    height: 842,
    padding: 40,
    flexGrow: 1,
  },

  // page: {
  // backgroundColor: "#fff", // Make the page itself white
  // padding: 0,              // No extra padding here
  // fontFamily: "Helvetica",
  // fontSize: 10,
  // color: "#000",
  // },

  // pdfContainer: {
  //   backgroundColor: "#fff",
  //   width: "100%",           // Use full width
  //   padding: 40,
  //   flexDirection: "column",
  //   gap: 20,
  // },


  // ===== Company Header =====
  companyHeader: {
    flexDirection: "row",
    gap: 20,
  },
  companyLogo: {
    width: 100,
    height: 100,
    backgroundColor: grayBg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4.5,
  },

  companyDetails: {
    width: 360,
    flexDirection: "column",
    gap: 4,
  },

  // Text sizes
  text14: { fontSize: 14, fontWeight: "bold" },
  text12: { fontSize: 12 },
  text10: { fontSize: 10 },
  textGray: { color: grayText },

  // ===== Employee Section =====
  employeeSection: {
    flexDirection: "row",
    gap: 10,
  },
  employeeInfo: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  employeeCards: {
    padding: 10,
    borderRadius: 4.5,
    backgroundColor: grayBg,
    flexDirection: "row",
    gap: 14,
  },
  employeeCardHalf: {
    width: "50%",
    flexDirection: "column",
    gap: 2,
  },

  // ===== Period & Nett Pay =====
  periodPay: {
    width: 133,
    flexDirection: "column",
    gap: 20,
  },
  periodBox: {
    flexDirection: "row",
    gap: 10,
  },
  nettPayBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: lightBlue,
    borderRadius: 4.5,
    textAlign: "center",
    flexDirection: "column",
    gap: 2,
    fontWeight: "bold",
    alignItems: "center",
    // height:70,
  },
  nettBlue: { color: lightBlue },

  // ===== Section Headers =====
  sectionSpace:{
    flexDirection: "column",
    gap: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: blue,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  sectionHeaderText: {
    margin: 0,
  },
  colTwoThirds: { width: "66.66%" },
  colOneThird: { width: "33.33%", textAlign: "right" },

  // ===== Section Rows =====
  sectionRows: {
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  sectionRow: {
    flexDirection: "row",
  },
  sectionRowText: {
    margin: 0,
    fontSize: 10,
  },
  fontBold: { fontWeight: "bold" },

  // ===== Footer =====
  footerText: {
    textAlign: "center",
    fontSize: 10,
  },
});

export default styles;
