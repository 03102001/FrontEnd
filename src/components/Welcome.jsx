import React from 'react';

const Welcome = () => {
    return (
        <div>
            <div className="content">
                <p
                    className="description"
                    style={{ fontFamily: 'Salsa, cursive', fontWeight: 'bold' }}
                >
                    APRIL merupakan produsen terkemuka serat terbarukan dan produk berbasis bio yang mengelola hutan tanaman industri dan menjalankan kegiatan manufaktur di Provinsi Riau, Sumatra, Indonesia. Perusahaan ini adalah grup bisnis yang berada di bawah Royal Golden Eagle (RGE), sebuah perusahaan sumber daya global yang berkantor pusat di Singapura.
                </p>
                <h1 className="title" style={{ fontFamily: 'Rametto One, cursive' }}>
                    APRIL Learning Institute (ALI)
                </h1>
                <p
                    className="description"
                    style={{ fontFamily: 'Salsa, cursive', fontWeight: 'bold' }}
                >
                    APRIL Learning Institute (ALI), di tempat ini kami menempa sumber daya manusia (SDM) untuk kemajuan perusahaan. Sebuah pusat pelatihan internal bagi karyawan grup APRIL. Para trainers di ALI menganalisis kebutuhan-kebutuhan teknikal dan soft skill karyawan, kemudian merencanakan modul pelatihan yang disesuaikan dengan kebutuhan setiap individu. Setiap hari gedung ALI tak pernah sepi dengan pelatihan, ibarat kampus karyawan kami bersemangat menuju ALI menjemput pengetahuan baru.
                </p>
            </div>
            <footer style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>
                    &copy; {new Date().getFullYear()} APRIL Learning Institute. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Welcome;
