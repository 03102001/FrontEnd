import React, { Component } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../logo.png';

class ItIsTemplate extends Component {
    render() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const refNo = `01/GP/IT-IS/${currentMonth}/${currentYear}`;

        return (
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <Document>
                    <Page style={styles.page}>
                        <View style={styles.logoContainer}>
                            <Image src={logo} style={styles.logo} />
                        </View>
                        <View style={styles.logoLine} />
                        <Text style={styles.title}>IT/IS Gatepass</Text>

                        {/* Form Section */}
                        <View style={styles.formSection}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Date :</Text>
                                <Text style={styles.sectionText}>{currentDate.toLocaleDateString('en-GB')} {currentDate.toLocaleTimeString('en-GB')}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ref.No :</Text>
                                <Text style={styles.sectionText}>{refNo}</Text>
                            </View>
                            <Text style={[styles.pembuka, styles.alignLeft]}>
                                Dengan Hormat,
                                {'\n'}
                                Bersama ini disampaikan bahwa barang-barang tertera di bawah ini mohon diberikan izin keluar dengan :
                            </Text>
                        </View>

                        <View style={styles.formSection}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Tujuan Lokasi : Pekanbaru</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Alasan : Rusak</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Dibawa Oleh: Rafael</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Kendaraan : Avanza</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Plat No. : BM 1234 TW</Text>
                            </View>
                        </View>
                        <View style={styles.signatureSection}>
                            <View style={styles.signatureBox}>
                                <Text style={styles.signatureLabel}>Paraf:</Text>
                                <View style={styles.signatureLine} />
                            </View>
                        </View>
                        <Text style={[styles.pembuka, styles.alignLeft]}>
                            Dengan rincian barang sbb :
                        </Text>

                        {/* Table Section */}
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableHeader}>No.</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableHeader}>Serial No</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableHeader}>Description</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableHeader}>Quantity</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>1</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>123123123</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>Komputer</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>3</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>2</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>123123123</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>Komputer</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>10</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>3</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>234234234</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>Laptop</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>5</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>4</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>345345345</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>Mouse</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>20</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>5</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>456456456</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>CPU</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.tableData}>15</Text>
                                </View>
                            </View>
                            <Text style={[styles.penutup, styles.alignLeft]}>
                                Demikian surat keterangan surat ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
                                {'\n'}
                                Atas kerjasamanya kami ucapkat terima kasih
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pangkalan Kerinci</Text>
                        </View>

                        {/* Additional Form Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Dibuat Oleh,</Text>
                            <Text style={styles.sectionTitle}>Atas Rekomendasi Dari,</Text>
                            <Text style={styles.sectionTitle}>Diketahui Oleh,</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Natasia</Text>
                            <Text style={styles.sectionTitle}>Henry</Text>
                            <Text style={styles.sectionTitle}>Jorlin</Text>
                        </View>

                    </Page>
                </Document>
            </PDFViewer>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'left',
    },
    logo: {
        width: 80,
        height: 35,
    },
    logoLine: {
        borderBottomWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    page: {
        padding: 30,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'left',
        fontFamily: 'Helvetica-Bold',
    },
    formSection: {
        marginBottom: 10,
    },
    section: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    pembuka: {
        fontSize: 12,
        marginBottom: 10,
        fontFamily: 'Helvetica',
        textAlign: 'left',
    },
    penutup: {
        fontSize: 12,
        marginBottom: 10,
        fontFamily: 'Helvetica',
        textAlign: 'left',
    },
    sectionTitle: {
        width: '45%',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    sectionText: {
        fontSize: 12,
        fontFamily: 'Helvetica',
        textAlign: 'left',
    },
    addButton: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'right',
    },
    table: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        width: '33.33%',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    tableHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    tableData: {
        fontSize: 12,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    signatureBox: {
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        position: 'relative',
    },
    signatureLabel: {
        position: 'absolute',
        top: -15,
        left: 5,
        fontSize: 10,
        fontWeight: 'bold',
    },
    signatureLine: {
        position: 'absolute',
        bottom: 0,
        left: 5,
        right: 5,
        height: 1,
        backgroundColor: '#000000',
    },
});

export default ItIsTemplate;
