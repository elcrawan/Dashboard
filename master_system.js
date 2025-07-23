// Master System JavaScript - Advanced Features
// AI-Powered Construction & Financial Management System

class ConstructionManagementSystem {
    constructor() {
        this.data = {
            projects: [],
            tenders: [],
            financial: [],
            suppliers: [],
            contracts: []
        };
        this.charts = {};
        this.aiAssistant = new AIAssistant();
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.initializeCharts();
        this.startRealTimeUpdates();
        this.setupDragAndDrop();
        this.setupVoiceCommands();
    }

    // Advanced Data Management
    async loadData() {
        try {
            const response = await fetch('data/construction_data.json');
            this.data = await response.json();
            this.updateDashboard();
        } catch (error) {
            console.error('Error loading data:', error);
            this.generateSampleData();
        }
    }

    generateSampleData() {
        // Generate realistic sample data
        this.data = {
            projects: this.generateProjects(),
            tenders: this.generateTenders(),
            financial: this.generateFinancialData(),
            suppliers: this.generateSuppliers(),
            contracts: this.generateContracts()
        };
        this.saveData();
    }

    generateProjects() {
        const projects = [];
        const projectTypes = ['مبنى سكني', 'مبنى تجاري', 'بنية تحتية', 'مشروع صناعي'];
        const statuses = ['جديد', 'قيد التنفيذ', 'مكتمل', 'متأخر'];
        
        for (let i = 1; i <= 15; i++) {
            const startDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
            const duration = Math.floor(Math.random() * 365) + 90;
            const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
            
            projects.push({
                id: `PRJ-${String(i).padStart(3, '0')}`,
                name: `مشروع ${projectTypes[Math.floor(Math.random() * projectTypes.length)]} ${i}`,
                client: `عميل ${i}`,
                budget: Math.floor(Math.random() * 5000000) + 1000000,
                spent: Math.floor(Math.random() * 3000000) + 500000,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                progress: Math.floor(Math.random() * 100),
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                location: `الموقع ${i}`,
                manager: `مدير المشروع ${i}`,
                priority: Math.floor(Math.random() * 5) + 1
            });
        }
        return projects;
    }

    generateTenders() {
        const tenders = [];
        const types = ['مناقصة عامة', 'مناقصة محدودة', 'عرض سعر مباشر'];
        const statuses = ['قيد المراجعة', 'مقبول', 'مرفوض', 'قيد التفاوض'];
        
        for (let i = 1; i <= 10; i++) {
            tenders.push({
                id: `TND-${String(i).padStart(3, '0')}`,
                title: `مناقصة ${i}`,
                type: types[Math.floor(Math.random() * types.length)],
                budget: Math.floor(Math.random() * 2000000) + 500000,
                submissionDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                probability: Math.floor(Math.random() * 100),
                client: `جهة مناقصة ${i}`,
                description: `وصف المناقصة ${i}`
            });
        }
        return tenders;
    }

    generateFinancialData() {
        const financial = [];
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        
        for (let i = 0; i < 12; i++) {
            const revenue = Math.floor(Math.random() * 5000000) + 1000000;
            const expenses = Math.floor(Math.random() * 3000000) + 500000;
            
            financial.push({
                month: months[i],
                revenue: revenue,
                expenses: expenses,
                profit: revenue - expenses,
                vat: revenue * 0.05,
                incomeTax: (revenue - expenses) * 0.09,
                cashFlow: Math.floor(Math.random() * 1000000) + 200000
            });
        }
        return financial;
    }

    generateSuppliers() {
        const suppliers = [];
        const categories = ['مواد بناء', 'معدات', 'خدمات', 'عمالة'];
        
        for (let i = 1; i <= 8; i++) {
            suppliers.push({
                id: `SUP-${String(i).padStart(3, '0')}`,
                name: `مورد ${i}`,
                category: categories[Math.floor(Math.random() * categories.length)],
                contact: `050-${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
                email: `supplier${i}@email.com`,
                rating: Math.floor(Math.random() * 5) + 1,
                totalContracts: Math.floor(Math.random() * 50) + 5,
                totalValue: Math.floor(Math.random() * 5000000) + 1000000
            });
        }
        return suppliers;
    }

    generateContracts() {
        const contracts = [];
        const types = ['عقد مقاولات', 'عقد توريد', 'عقد خدمات'];
        const statuses = ['فعال', 'مكتمل', 'ملغي', 'قيد المراجعة'];
        
        for (let i = 1; i <= 12; i++) {
            contracts.push({
                id: `CNT-${String(i).padStart(3, '0')}`,
                type: types[Math.floor(Math.random() * types.length)],
                value: Math.floor(Math.random() * 2000000) + 100000,
                startDate: new Date(2024, Math.floor(Math.random() * 12), 1).toISOString().split('T')[0],
                endDate: new Date(2024, Math.floor(Math.random() * 12) + 1, 28).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                party: `الطرف ${i}`,
                terms: `شروط العقد ${i}`
            });
        }
        return contracts;
    }

    // Advanced Chart System
    initializeCharts() {
        this.createMonthlyPerformanceChart();
        this.createBudgetDistributionChart();
        this.createProjectStatusChart();
        this.createFinancialOverviewChart();
    }

    createMonthlyPerformanceChart() {
        const ctx = document.getElementById('monthlyPerformanceChart');
        if (!ctx) return;

        const data = this.data.financial;
        
        this.charts.monthly = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.month),
                datasets: [{
                    label: 'الإيرادات',
                    data: data.map(d => d.revenue),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'المصروفات',
                    data: data.map(d => d.expenses),
                    borderColor: '#f093fb',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'الأرباح',
                    data: data.map(d => d.profit),
                    borderColor: '#11998e',
                    backgroundColor: 'rgba(17, 153, 142, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('ar-SA').format(value) + ' د.إ';
                            }
                        }
                    }
                }
            }
        });
    }

    createBudgetDistributionChart() {
        const ctx = document.getElementById('budgetDistributionChart');
        if (!ctx) return;

        const projects = this.data.projects;
        const categories = projects.reduce((acc, project) => {
            const category = project.name.split(' ')[1] || 'أخرى';
            acc[category] = (acc[category] || 0) + project.budget;
            return acc;
        }, {});

        this.charts.budget = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true }
                    }
                }
            }
        });
    }

    // Real-time Updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateDashboard();
            this.updateCharts();
        }, 30000); // Update every 30 seconds
    }

    updateDashboard() {
        const projects = this.data.projects;
        const tenders = this.data.tenders;
        const financial = this.data.financial;

        // Update metrics
        document.getElementById('total-revenue').textContent = 
            new Intl.NumberFormat('ar-SA').format(
                financial.reduce((sum, d) => sum + d.revenue, 0)
            ) + ' د.إ';

        document.getElementById('active-projects').textContent = 
            projects.filter(p => p.status === 'قيد التنفيذ').length;

        document.getElementById('pending-tenders').textContent = 
            tenders.filter(t => t.status === 'قيد المراجعة').length;

        const totalProgress = projects.reduce((sum, p) => sum + p.progress, 0);
        document.getElementById('completion-rate').textContent = 
            Math.round(totalProgress / projects.length) + '%';
    }

    // AI Assistant
    class AIAssistant {
        constructor() {
            this.context = {
                language: 'ar',
                timezone: 'Asia/Dubai',
                currency: 'AED'
            };
        }

        async processQuery(query) {
            // Simple AI processing
            const responses = {
                'مشاريع': 'لديك ' + this.data.projects.length + ' مشروع نشط حالياً',
                'مناقصات': 'يوجد ' + this.data.tenders.length + ' مناقصة قيد المراجعة',
                'أرباح': 'إجمالي الأرباح لهذا الشهر: ' + 
                    new Intl.NumberFormat('ar-SA').format(
                        this.data.financial[this.data.financial.length - 1]?.profit || 0
                    ) + ' د.إ',
                'ضرائب': 'ضريبة القيمة المضافة: 5%، ضريبة الدخل: 9%'
            };

            for (const [key, response] of Object.entries(responses)) {
                if (query.includes(key)) {
                    return response;
                }
            }

            return 'يمكنني مساعدتك في المشاريع، المناقصات، التقارير المالية، والضرائب.';
        }
    }

    // Advanced Features
    setupDragAndDrop() {
        const dropZone = document.createElement('div');
        dropZone.className = 'drag-drop-zone';
        dropZone.innerHTML = `
            <i class="fas fa-cloud-upload-alt fa-3x mb-3"></i>
            <h5>اسحب ملفاتك هنا</h5>
            <p>PDF, Excel, أو ملفات CSV</p>
        `;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleFileUpload(e.dataTransfer.files);
        });

        document.body.appendChild(dropZone);
    }

    async handleFileUpload(files) {
        for (const file of files) {
            if (file.type.includes('csv') || file.type.includes('excel') || file.type.includes('pdf')) {
                const formData = new FormData();
                formData.append('file', file);
                
                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const result = await response.json();
                    this.showNotification(`تم رفع ${file.name} بنجاح`, 'success');
                } catch (error) {
                    this.showNotification('خطأ في رفع الملف', 'error');
                }
            }
        }
    }

    setupVoiceCommands() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'ar-SA';
            recognition.continuous = false;
            
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript;
                this.processVoiceCommand(command);
            };
            
            // Add voice activation button
            const voiceBtn = document.createElement('button');
            voiceBtn.className = 'btn btn-outline-primary btn-sm';
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.onclick = () => recognition.start();
            
            document.querySelector('.navbar').appendChild(voiceBtn);
        }
    }

    processVoiceCommand(command) {
        const commands = {
            'افتح المشاريع': () => this.showSection('projects'),
            'أظهر التقارير': () => this.showSection('financial'),
            'أضف مشروع': () => this.quickAdd('project'),
            'احسب الضرائب': () => this.calculateTaxes()
        };

        for (const [key, action] of Object.entries(commands)) {
            if (command.includes(key)) {
                action();
                break;
            }
        }
    }

    // Export Functions
    exportToPDF(section) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFont('helvetica');
        doc.text('تقرير النظام المتكامل', 20, 20);
        
        const data = this.data[section] || [];
        let yPos = 40;
        
        data.forEach((item, index) => {
            doc.text(`${index + 1}. ${JSON.stringify(item)}`, 20, yPos);
            yPos += 10;
        });
        
        doc.save(`${section}_report.pdf`);
    }

    exportToExcel(section) {
        const data = this.data[section] || [];
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, section);
        XLSX.writeFile(wb, `${section}_data.xlsx`);
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 'p': this.exportToPDF('projects'); break;
                    case 'e': this.exportToExcel('projects'); break;
                    case 'n': this.quickAdd('project'); break;
                }
            }
        });
    }

    showSection(section) {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(s => s.style.display = 'none');
        
        // Show selected section
        const sectionElement = document.getElementById(`${section}-section`);
        if (sectionElement) {
            sectionElement.style.display = 'block';
        }
    }

    quickAdd(type) {
        const modal = new bootstrap.Modal(document.getElementById('quickAddModal'));
        modal.show();
    }

    calculateTaxes() {
        const revenue = prompt('أدخل الإيرادات:');
        if (revenue) {
            const vat = revenue * 0.05;
            const incomeTax = revenue * 0.09;
            alert(`ضريبة القيمة المضافة: ${vat} د.إ\nضريبة الدخل: ${incomeTax} د.إ`);
        }
    }

    saveData() {
        localStorage.setItem('constructionData', JSON.stringify(this.data));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('constructionData');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    }
}

// AI Chat Function
async function askAI() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('ai-chat');
    const query = input.value;
    
    if (!query) return;
    
    // Add user message
    chat.innerHTML += `<div class="alert alert-primary text-end">${query}</div>`;
    
    // Get AI response
    const response = await system.aiAssistant.processQuery(query);
    chat.innerHTML += `<div class="alert alert-info">${response}</div>`;
    
    input.value = '';
    chat.scrollTop = chat.scrollHeight;
}

// Initialize System
let system;
document.addEventListener('DOMContentLoaded', () => {
    system = new ConstructionManagementSystem();
});

// Global functions for HTML
function quickAdd(type) {
    system.quickAdd(type);
}

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}