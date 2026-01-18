import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { IStudent } from "../interfaces/IStudent.ts";
import { format } from "date-fns";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 9,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 9,
    color: "#666",
    marginTop: 4,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#bfbfbf",
    minHeight: 20,
    alignItems: "center",
  },
  tableColHeader: {
    fontWeight: "bold",
    padding: 4,
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    padding: 4,
  },
  col1: { width: "15%" },
  col2: { width: "15%" },
  col3: { width: "30%" },
  col4: { width: "20%" },
  col5: { width: "20%" },
});

export const StudentsPDF = ({ students }: { students: IStudent[] }) => {
  const today = format(new Date(), "dd.MM.yyyy HH:mm");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Lista Studentów</Text>
          <Text style={styles.dateText}>Wygenerowano: {today}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableColHeader, styles.col1]}>Imię</Text>
            <Text style={[styles.tableColHeader, styles.col2]}>Nazwisko</Text>
            <Text style={[styles.tableColHeader, styles.col3]}>Email</Text>
            <Text style={[styles.tableColHeader, styles.col4]}>Telefon</Text>
            <Text style={[styles.tableColHeader, styles.col5]}>Języki</Text>
          </View>

          {students.map((s, index) => (
            <View style={styles.tableRow} key={s.uid || index}>
              <Text style={[styles.tableCol, styles.col1]}>{s.name}</Text>
              <Text style={[styles.tableCol, styles.col2]}>{s.surname}</Text>
              <Text style={[styles.tableCol, styles.col3]}>{s.email}</Text>
              <Text style={[styles.tableCol, styles.col4]}>{s.phone || "-"}</Text>
              <Text style={[styles.tableCol, styles.col5]}>
                {s.languages && s.languages.length > 0
                  ? s.languages.map(l => l.subject).join(", ")
                  : "-"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};