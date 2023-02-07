import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "white"
  },
  text: {
    color: "black",
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Times-Roman"
  },
  section: {
    margin: 10,
    padding: 10
  },
  viewer: {
    // width: "100%", //the pdf viewer will take up all of the width and height
    // height: "100%"
    // width: window.innerWidth, //the pdf viewer will take up all of the width and height
    // height: window.innerHeight
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerImage: {
    width: 70,
    height: 85
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    textAlign: "center",
    fontFamily: "Times-Roman"
  },
  textFicha: {
    color: "black",
    margin: 10,
    marginRight: 30,
    textAlign: "right",
    fontSize: 12,
    fontFamily: "Times-Roman"
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contentRight: {
    width: "20%",
    marginTop: 30
    // marginRight: 10
  },
  contentLeft: {
    width: "80%",
    marginRight: 20
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20
  },
  textFooter: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Times-Roman"
  }
});

// Create Document Component
const FichaPdf = ({ data }) => {
  const { numFicha, name, speciality, photo } = data;

  return (
    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image
              src={require("../../assets/img/DGETI-logo.png")}
              style={styles.headerImage}
            />
            <View style={styles.headerText}>
              <Text style={styles.text}>SECRETARIA DE EDUCACION PUBLICA</Text>
              <Text style={styles.text}>
                CENTRO DE BACHILLERATO TECNOLOGICO industrial y de servicios No.
                205
              </Text>
              <Text style={styles.text}>
                FICHA DE SOLICITUD PARA EL EXAMEN DE INGRESO A LA EDUCACION
                MEDIA SUPERIOR TECNOLÓGICA CICLO ESCOLAR 2023-2024
              </Text>
            </View>
            <Image
              src={require("../../assets/img/DGETI-logo.png")}
              style={styles.headerImage}
            />
          </View>
          <Text style={styles.text}>
            ____________________________________________________________________________________
          </Text>
          <Text style={styles.textFicha}>NUMERO DE FICHA: {numFicha}</Text>
          <View style={styles.content}>
            <View style={styles.contentLeft}>
              <Text style={styles.text}>
                NOMBRE DEL ASPIRANTE: {name?.toUpperCase()}
              </Text>
              <View style={styles.contentHeader}>
                <Text style={styles.text}>
                  ESPECIALIDAD SOLICITADA: {speciality?.toUpperCase()}
                </Text>
                <Text style={styles.text}>AULA: </Text>
              </View>
              <Text style={styles.text}>
                EL EXAMEN SE LLEVARA A CABO EL DÍA 16/03/2023 A LAS 8:00 HORAS
              </Text>
              <Text style={styles.text}>
                PRESENTARSE PUNTUALMENTE EN EL DÍA Y HORA SEÑALADOS PARA EL
                EXAMEN
              </Text>
              <Text style={styles.text}>
                PRESENTAR ESTA FICHA COMO IDENTIFICACIÓN CON FOTOGRAFÍA Y SELLO
                DEL PLANTEL
              </Text>
              <Text style={styles.text}>
                LOS MATERIALES QUE NECESITA SON: LAPIZ (NO. 2), GOMA Y
                SACAPUNTAS.
              </Text>
            </View>
            <View style={styles.contentRight}>
              <Image src={photo} style={styles.headerImage} />
            </View>
          </View>
          <Text style={styles.textFooter}>ASPIRANTE</Text>
        </View>
        <View style={styles.section}>
          <Text>World</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FichaPdf;
