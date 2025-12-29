// Aplikasi Vue.js untuk Pembuatan Kartu Natal 2025
const { createApp } = Vue;

createApp({
    data() {
        return {
            // Data waktu
            currentTime: this.getCurrentTime(),
            
            // Data utama kartu
            cardData: {
                recipientName: '',
                title: 'Selamat Hari Natal 2025',
                message: 'Semoga hari ini penuh dengan kebahagiaan, kedamaian, dan kasih sayang untuk Anda dan keluarga tercinta.',
                senderName: ''
            },
            
            // Pilihan warna
            selectedColor: {
                id: 1,
                name: 'Merah Natal',
                value: '#662222'
            },
            
            colorOptions: [
                { id: 1, name: 'Merah Natal', value: '#662222' },
                { id: 2, name: 'Merah Muda', value: '#842A3B' },
                { id: 3, name: 'Pink Natal', value: '#A3485A' },
                { id: 4, name: 'Krem Emas', value: '#F5DAA7' }
            ],
            
            // Pilihan template
            selectedTemplate: {
                id: 1,
                name: 'Klasik',
                icon: 'fas fa-tree',
                style: 'background: linear-gradient(135deg, #662222, #842A3B)'
            },
            
            templates: [
                { 
                    id: 1, 
                    name: 'Klasik', 
                    icon: 'fas fa-tree',
                    style: 'background: linear-gradient(135deg, #662222, #842A3B)'
                },
                { 
                    id: 2, 
                    name: 'Modern', 
                    icon: 'fas fa-star',
                    style: 'background: linear-gradient(135deg, #842A3B, #A3485A)'
                },
                { 
                    id: 3, 
                    name: 'Elegan', 
                    icon: 'fas fa-gem',
                    style: 'background: linear-gradient(135deg, #A3485A, #F5DAA7)'
                },
                { 
                    id: 4, 
                    name: 'Minimalis', 
                    icon: 'fas fa-snowflake',
                    style: 'background: linear-gradient(135deg, #662222, #3A1111)'
                },
                { 
                    id: 5, 
                    name: 'Festive', 
                    icon: 'fas fa-gift',
                    style: 'background: linear-gradient(135deg, #A3485A, #842A3B)'
                },
                { 
                    id: 6, 
                    name: 'Tradisional', 
                    icon: 'fas fa-heart',
                    style: 'background: linear-gradient(135deg, #842A3B, #662222)'
                }
            ],
            
            // Template pesan cepat
            messageTemplates: [
                {
                    title: 'Keluarga',
                    recipient: 'Keluarga Tercinta',
                    message: 'Selamat Hari Natal 2025! Semoga hari ini membawa kebahagiaan dan kedamaian bagi kita semua. Mari kita rayakan bersama dengan penuh cinta dan sukacita.',
                    sender: 'Dengan kasih, Keluarga'
                },
                {
                    title: 'Teman',
                    recipient: 'Teman Terbaik',
                    message: 'Merry Christmas 2025! Semoga Natal ini membawa tawa, keceriaan, dan kenangan indah untuk kita. Terima kasih telah menjadi bagian dari hidup saya.',
                    sender: 'Sahabatmu selalu'
                },
                {
                    title: 'Kolega',
                    recipient: 'Rekan Kerja',
                    message: 'Selamat Hari Natal 2025! Semoga Natal ini memberikan energi baru dan inspirasi untuk tahun yang akan datang. Sukses selalu untuk kita semua.',
                    sender: 'Rekan Kerja'
                },
                {
                    title: 'Pasangan',
                    recipient: 'Cintaku',
                    message: 'Selamat Natal sayang! Semoga hari ini penuh dengan kehangatan cinta kita. Terima kasih telah menjadi cahaya dalam hidup saya.',
                    sender: 'Cintamu selalu'
                }
            ],
            
            // Gaya ucapan
            greetingStyles: [
                { id: 1, name: 'Indonesia', flag: '🇮🇩', greeting: 'Selamat Hari Natal 2025' },
                { id: 2, name: 'Inggris', flag: '🇬🇧', greeting: 'Merry Christmas 2025' },
                { id: 3, name: 'Prancis', flag: '🇫🇷', greeting: 'Joyeux Noël 2025' },
                { id: 4, name: 'Spanyol', flag: '🇪🇸', greeting: 'Feliz Navidad 2025' }
            ],
            
            // Musik player
            musicPlaying: false,
            volume: 50,
            
            // Statistik
            stats: {
                cardsCreated: 1258,
                templatesUsed: 643,
                shares: 892
            },
            
            // Status loading
            loading: false,
            
            // Notifikasi
            notification: {
                show: false,
                message: '',
                type: 'info',
                icon: 'fas fa-info-circle'
            }
        };
    },
    
    computed: {
        // Gaya kartu berdasarkan warna yang dipilih
        cardStyle() {
            return {
                background: `linear-gradient(135deg, ${this.selectedColor.value}, ${this.lightenColor(this.selectedColor.value, 20)})`
            };
        },
        
        // Gaya header kartu
        headerStyle() {
            return {
                background: `linear-gradient(135deg, ${this.darkenColor(this.selectedColor.value, 10)}, ${this.selectedColor.value})`
            };
        },
        
        // Status kartu
        cardStatus() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                return { text: 'Belum Lengkap', class: 'warning' };
            }
            if (!this.cardData.message || this.cardData.message.length < 10) {
                return { text: 'Pesan Pendek', class: 'info' };
            }
            return { text: 'Siap Dibagikan', class: 'success' };
        }
    },
    
    mounted() {
        // Update waktu setiap detik
        setInterval(() => {
            this.currentTime = this.getCurrentTime();
        }, 1000);
        
        // Tampilkan notifikasi selamat datang
        setTimeout(() => {
            this.showNotification(
                'Selamat datang di pembuat kartu ucapan Natal 2025! Mulai buat kartu personal Anda sekarang.',
                'success',
                'fas fa-gift'
            );
        }, 1500);
        
        // Set volume awal
        this.$refs.musicPlayer.volume = this.volume / 100;
    },
    
    methods: {
        // Format waktu
        getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        
        // Pilih warna
        selectColor(color) {
            this.selectedColor = color;
            this.showNotification(`Warna ${color.name} dipilih`, 'info', 'fas fa-palette');
        },
        
        // Pilih template
        selectTemplate(template) {
            this.selectedTemplate = template;
            this.showNotification(`Template ${template.name} dipilih`, 'info', template.icon);
        },
        
        // Terapkan template pesan
        applyTemplate(template) {
            this.cardData.recipientName = template.recipient;
            this.cardData.message = template.message;
            this.cardData.senderName = template.sender;
            
            this.showNotification(
                `Template "${template.title}" diterapkan`,
                'success',
                'fas fa-bolt'
            );
        },
        
        // Terapkan gaya ucapan
        applyGreetingStyle(style) {
            this.cardData.title = style.greeting;
            this.showNotification(
                `Ucapan ${style.name} diterapkan: ${style.greeting}`,
                'info',
                'fas fa-language'
            );
        },
        
        // Generate kartu otomatis
        generateCard() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Harap isi nama penerima dan pengirim terlebih dahulu',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            this.loading = true;
            
            // Simulasi proses generate
            setTimeout(() => {
                const messages = [
                    "Selamat Hari Natal 2025! Semoga hari ini membawa kedamaian dan kebahagiaan untuk Anda dan keluarga.",
                    "Merry Christmas 2025! Mari kita rayakan kelahiran Yesus dengan hati yang penuh syukur.",
                    "Selamat merayakan Natal 2025. Semoga kasih Natal menyertai kita sepanjang tahun.",
                    "Di hari Natal yang penuh berkah ini, semoga kita semua diberi kesehatan dan kebahagiaan."
                ];
                
                this.cardData.message = messages[Math.floor(Math.random() * messages.length)];
                this.loading = false;
                
                this.showNotification(
                    'Kartu berhasil digenerate!',
                    'success',
                    'fas fa-magic'
                );
            }, 1500);
        },
        
        // Reset form
        resetForm() {
            this.cardData = {
                recipientName: '',
                title: 'Selamat Hari Natal 2025',
                message: 'Semoga hari ini penuh dengan kebahagiaan, kedamaian, dan kasih sayang untuk Anda dan keluarga tercinta.',
                senderName: ''
            };
            
            this.selectedColor = this.colorOptions[0];
            this.selectedTemplate = this.templates[0];
            
            this.showNotification(
                'Form berhasil direset',
                'info',
                'fas fa-redo'
            );
        },
        
        // Simpan draft
        saveDraft() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Tidak dapat menyimpan draft. Data belum lengkap.',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            // Simulasi penyimpanan
            setTimeout(() => {
                this.showNotification(
                    'Draft berhasil disimpan!',
                    'success',
                    'fas fa-save'
                );
                
                // Update statistik
                this.stats.cardsCreated++;
            }, 1000);
        },
        
        // Download kartu
        downloadCard() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Harap lengkapi data kartu terlebih dahulu',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            this.loading = true;
            
            // Simulasi download
            setTimeout(() => {
                this.loading = false;
                
                // Update statistik
                this.stats.cardsCreated++;
                
                this.showNotification(
                    'Kartu berhasil didownload dalam format PDF!',
                    'success',
                    'fas fa-download'
                );
                
                // Simulasi file download
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
                    `Kartu Ucapan Natal 2025\n\n` +
                    `Untuk: ${this.cardData.recipientName}\n` +
                    `\n${this.cardData.title}\n` +
                    `\n${this.cardData.message}\n` +
                    `\nDengan kasih,\n${this.cardData.senderName}\n` +
                    `\n25 Desember 2025`
                ));
                element.setAttribute('download', 'Kartu-Natal-2025.txt');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }, 2000);
        },
        
        // Bagikan kartu
        shareCard() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Harap lengkapi data kartu terlebih dahulu',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            const shareText = 
                `Kartu Ucapan Natal 2025\n\n` +
                `Untuk: ${this.cardData.recipientName}\n` +
                `\n${this.cardData.title}\n` +
                `\n${this.cardData.message}\n` +
                `\nDengan kasih,\n${this.cardData.senderName}\n` +
                `\n25 Desember 2025`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Kartu Ucapan Natal 2025',
                    text: shareText,
                    url: window.location.href
                }).then(() => {
                    this.stats.shares++;
                    this.showNotification(
                        'Kartu berhasil dibagikan!',
                        'success',
                        'fas fa-share-alt'
                    );
                }).catch(err => {
                    console.log('Error sharing:', err);
                    this.copyToClipboard(shareText);
                });
            } else {
                this.copyToClipboard(shareText);
            }
        },
        
        // Print kartu
        printCard() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Harap lengkapi data kartu terlebih dahulu',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            this.showNotification(
                'Mempersiapkan kartu untuk dicetak...',
                'info',
                'fas fa-print'
            );
            
            // Simulasi print
            setTimeout(() => {
                this.showNotification(
                    'Kartu siap dicetak! Gunakan Ctrl+P untuk mencetak.',
                    'success',
                    'fas fa-print'
                );
            }, 1000);
        },
        
        // Kirim email
        sendEmail() {
            if (!this.cardData.recipientName || !this.cardData.senderName) {
                this.showNotification(
                    'Harap lengkapi data kartu terlebih dahulu',
                    'error',
                    'fas fa-exclamation-circle'
                );
                return;
            }
            
            const subject = encodeURIComponent('Kartu Ucapan Natal 2025');
            const body = encodeURIComponent(
                `Kepada ${this.cardData.recipientName},\n\n` +
                `${this.cardData.title}\n\n` +
                `${this.cardData.message}\n\n` +
                `Dengan kasih,\n${this.cardData.senderName}\n` +
                `25 Desember 2025`
            );
            
            window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
            
            this.showNotification(
                'Membuka aplikasi email...',
                'info',
                'fas fa-envelope'
            );
        },
        
        // Kontrol musik
        toggleMusic() {
            const audio = this.$refs.musicPlayer;
            
            if (this.musicPlaying) {
                audio.pause();
                this.musicPlaying = false;
                this.showNotification('Musik dihentikan', 'info', 'fas fa-pause');
            } else {
                audio.play().then(() => {
                    this.musicPlaying = true;
                    this.showNotification('Musik Natal diputar', 'success', 'fas fa-play');
                }).catch(error => {
                    console.log('Error playing music:', error);
                    if (confirm('Izinkan pemutaran musik untuk pengalaman yang lebih baik?')) {
                        audio.play();
                        this.musicPlaying = true;
                    }
                });
            }
        },
        
        updateVolume() {
            this.$refs.musicPlayer.volume = this.volume / 100;
        },
        
        // Berbagi ke media sosial
        shareSocial(platform) {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Buat kartu ucapan Natal personal Anda di sini! 🎄');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'instagram':
                    this.showNotification('Bagikan screenshot kartu Anda di Instagram!', 'info', 'fab fa-instagram');
                    return;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${text}%20${url}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
            this.showNotification(`Berbagi ke ${platform}`, 'success', `fab fa-${platform}`);
        },
        
        // Scroll ke section
        scrollToSection(sectionId) {
            const section = document.querySelector(`.${sectionId}-section`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        
        // Utility functions
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Teks disalin ke clipboard!', 'success', 'fas fa-copy');
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.showNotification('Gagal menyalin teks', 'error', 'fas fa-exclamation-circle');
            });
        },
        
        lightenColor(color, percent) {
            const num = parseInt(color.replace("#", ""), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            
            return "#" + (
                0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255)
            ).toString(16).slice(1);
        },
        
        darkenColor(color, percent) {
            const num = parseInt(color.replace("#", ""), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) - amt;
            const G = (num >> 8 & 0x00FF) - amt;
            const B = (num & 0x0000FF) - amt;
            
            return "#" + (
                0x1000000 +
                (R > 0 ? (R > 255 ? 255 : R) : 0) * 0x10000 +
                (G > 0 ? (G > 255 ? 255 : G) : 0) * 0x100 +
                (B > 0 ? (B > 255 ? 255 : B) : 0)
            ).toString(16).slice(1);
        },
        
        // Notification system
        showNotification(message, type = 'info', icon = 'fas fa-info-circle') {
            this.notification = {
                show: true,
                message,
                type,
                icon
            };
            
            setTimeout(() => {
                this.hideNotification();
            }, 5000);
        },
        
        hideNotification() {
            this.notification.show = false;
        },
        
        // Demo functions
        showAbout() {
            this.showNotification(
                'Pembuat Kartu Natal 2025 - Platform untuk membuat kartu ucapan Natal personal dengan desain elegan.',
                'info',
                'fas fa-info-circle'
            );
        },
        
        downloadTemplates() {
            this.showNotification(
                'Template gratis akan segera tersedia untuk diunduh!',
                'info',
                'fas fa-download'
            );
        },
        
        showExamples() {
            this.showNotification(
                'Lihat contoh kartu yang dibuat oleh pengguna lain di halaman contoh.',
                'info',
                'fas fa-images'
            );
        },
        
        showTips() {
            this.showNotification(
                'Tips: Gunakan pesan personal dan pilih warna yang sesuai dengan penerima.',
                'info',
                'fas fa-lightbulb'
            );
        },
        
        showFAQ() {
            this.showNotification(
                'FAQ: Kunjungi halaman FAQ untuk pertanyaan yang sering diajukan.',
                'info',
                'fas fa-question-circle'
            );
        },
        
        showContact() {
            this.showNotification(
                'Hubungi kami di support@natal2025.com untuk bantuan lebih lanjut.',
                'info',
                'fas fa-envelope'
            );
        },
        
        showFeedback() {
            this.showNotification(
                'Terima kasih atas feedback Anda! Kami akan terus meningkatkan layanan.',
                'success',
                'fas fa-comment-alt'
            );
        }
    }
}).mount('#app');