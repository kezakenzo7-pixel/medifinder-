export interface Pharmacy {
  id: string
  name: string
  location: string
  district: string
  province: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  operatingHours: string
  rating: number
  services: string[]
  deliveryAvailable: boolean
}

export interface Medicine {
  id: string
  name: string
  genericName: string
  description: string
  category: string
  manufacturer: string
  priceRWF: number
  priceUSD?: number
  stock: number
  rating: number
  reviews: number
  prescriptionRequired: boolean
  inStock: boolean
  dosage: string
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'ointment' | 'drops'
  expiryDate: string
  batchNumber: string
  storageConditions: string
  sideEffects: string[]
  contraindications: string[]
  availablePharmacies: {
    pharmacyId: string
    quantity: number
    lastUpdated: string
  }[]
  badge?: string
  discount?: number
  features?: string[]
}

export const rwandanPharmacies: Pharmacy[] = [
  {
    id: 'pharmacy-001',
    name: 'PharmaPlus Kigali',
    location: 'KN 2 Ave, Kigali City',
    district: 'Nyarugenge',
    province: 'Kigali',
    phone: '+250788123456',
    email: 'info@pharmaplus.rw',
    coordinates: { lat: -1.9536, lng: 30.0606 },
    operatingHours: '8:00 AM - 8:00 PM',
    rating: 4.8,
    services: ['Prescription Filling', 'Health Consultation', 'Delivery', 'Vaccination'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-002',
    name: 'Remera Medical Pharmacy',
    location: 'KG 7 Ave, Remera',
    district: 'Kicukiro',
    province: 'Kigali',
    phone: '+250788789012',
    email: 'contact@remeramedical.rw',
    coordinates: { lat: -1.9592, lng: 30.1302 },
    operatingHours: '7:00 AM - 10:00 PM',
    rating: 4.7,
    services: ['24/7 Service', 'Emergency Care', 'Delivery', 'Medical Equipment'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-003',
    name: 'Kimironko Health Center Pharmacy',
    location: 'KG 623 St, Kimironko',
    district: 'Gasabo',
    province: 'Kigali',
    phone: '+250788345678',
    email: 'pharmacy@kimironkohealth.rw',
    coordinates: { lat: -1.9369, lng: 30.1306 },
    operatingHours: '8:00 AM - 6:00 PM',
    rating: 4.6,
    services: ['Prescription Filling', 'Health Screening', 'Family Planning'],
    deliveryAvailable: false
  },
  {
    id: 'pharmacy-004',
    name: 'Nyabugogo Community Pharmacy',
    location: 'KN 5 Rd, Nyabugogo',
    district: 'Nyarugenge',
    province: 'Kigali',
    phone: '+250788901234',
    email: 'info@nyabugogopharmacy.rw',
    coordinates: { lat: -1.9488, lng: 30.0583 },
    operatingHours: '7:30 AM - 9:00 PM',
    rating: 4.5,
    services: ['Prescription Filling', 'Basic Health Check', 'Delivery'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-005',
    name: 'Kacyiru Hospital Pharmacy',
    location: 'KG 16 Ave, Kacyiru',
    district: 'Gasabo',
    province: 'Kigali',
    phone: '+250788567890',
    email: 'pharmacy@kacyiruhospital.rw',
    coordinates: { lat: -1.9271, lng: 30.1116 },
    operatingHours: '24 Hours',
    rating: 4.9,
    services: ['24/7 Service', 'Emergency Medicine', 'Specialist Consultation', 'Delivery'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-006',
    name: 'Gikondo MediCare',
    location: 'KG 598 St, Gikondo',
    district: 'Kicukiro',
    province: 'Kigali',
    phone: '+250788234567',
    email: 'info@gikondomedicare.rw',
    coordinates: { lat: -1.9891, lng: 30.1265 },
    operatingHours: '8:00 AM - 8:00 PM',
    rating: 4.4,
    services: ['Prescription Filling', 'Chronic Care', 'Health Education'],
    deliveryAvailable: false
  },
  {
    id: 'pharmacy-007',
    name: 'Nyamirambo Regional Pharmacy',
    location: 'KN 7 St, Nyamirambo',
    district: 'Nyarugenge',
    province: 'Kigali',
    phone: '+250788890123',
    email: 'contact@nyamirambo.rw',
    coordinates: { lat: -1.9364, lng: 30.0445 },
    operatingHours: '7:00 AM - 10:00 PM',
    rating: 4.6,
    services: ['Prescription Filling', 'Maternal Health', 'Child Health', 'Delivery'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-008',
    name: 'Muhanga District Pharmacy',
    location: 'Muhanga Town Center',
    district: 'Muhanga',
    province: 'Southern',
    phone: '+250788345234',
    email: 'info@muhangapharmacy.rw',
    coordinates: { lat: -2.1476, lng: 29.7366 },
    operatingHours: '8:00 AM - 6:00 PM',
    rating: 4.3,
    services: ['Prescription Filling', 'Rural Health Outreach', 'Mobile Clinic'],
    deliveryAvailable: false
  },
  {
    id: 'pharmacy-009',
    name: 'Rubavu Medical Supply',
    location: 'Rubavu Town, Near Border',
    district: 'Rubavu',
    province: 'Western',
    phone: '+250788456789',
    email: 'info@rubavumedical.rw',
    coordinates: { lat: -1.6543, lng: 29.2587 },
    operatingHours: '7:00 AM - 9:00 PM',
    rating: 4.5,
    services: ['Prescription Filling', 'Cross-Border Health', 'Emergency Care'],
    deliveryAvailable: true
  },
  {
    id: 'pharmacy-010',
    name: 'Musanze Health Pharmacy',
    location: 'Musanze Town Center',
    district: 'Musanze',
    province: 'Northern',
    phone: '+250788567234',
    email: 'info@musanzehealth.rw',
    coordinates: { lat: -1.5079, lng: 29.6325 },
    operatingHours: '8:00 AM - 7:00 PM',
    rating: 4.4,
    services: ['Prescription Filling', 'Tourist Health', 'Mountain Medicine'],
    deliveryAvailable: false
  }
]

export const rwandanMedicines: Medicine[] = [
  // Pain Relief Medicines
  {
    id: 'med-001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    description: 'Effective pain reliever and fever reducer for headaches, muscle aches, and fever',
    category: 'pain-relief',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 1500,
    priceUSD: 1.20,
    stock: 500,
    rating: 4.8,
    reviews: 324,
    prescriptionRequired: false,
    inStock: true,
    dosage: '500mg',
    form: 'tablet',
    expiryDate: '2025-12-31',
    batchNumber: 'PR2024001',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Rare allergic reactions', 'Liver damage with overdose'],
    contraindications: ['Severe liver disease', 'Alcohol dependence'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 150, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 200, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 100, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-004', quantity: 50, lastUpdated: '2024-01-15' }
    ],
    badge: 'Best Seller',
    features: ['Fast Acting', '24-Hour Relief', 'Non-Drowsy']
  },
  {
    id: 'med-002',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    description: 'Powerful anti-inflammatory for pain, swelling, and fever reduction',
    category: 'pain-relief',
    manufacturer: 'MediTech Rwanda',
    priceRWF: 2500,
    priceUSD: 2.00,
    stock: 300,
    rating: 4.6,
    reviews: 412,
    prescriptionRequired: false,
    inStock: true,
    dosage: '400mg',
    form: 'tablet',
    expiryDate: '2025-08-15',
    batchNumber: 'MT2024002',
    storageConditions: 'Store below 30°C, protect from light',
    sideEffects: ['Stomach upset', 'Headache', 'Dizziness'],
    contraindications: ['Stomach ulcers', 'Kidney disease', 'Pregnancy (3rd trimester)'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 150, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 50, lastUpdated: '2024-01-14' }
    ],
    badge: 'Popular',
    features: ['Anti-Inflammatory', 'Long Lasting', 'Fast Relief']
  },
  {
    id: 'med-003',
    name: 'Aspirin 81mg',
    genericName: 'Acetylsalicylic Acid',
    description: 'Low-dose aspirin for heart attack and stroke prevention',
    category: 'heart-health',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 1200,
    priceUSD: 0.96,
    stock: 800,
    rating: 4.5,
    reviews: 298,
    prescriptionRequired: false,
    inStock: true,
    dosage: '81mg',
    form: 'tablet',
    expiryDate: '2026-02-28',
    batchNumber: 'HP2024003',
    storageConditions: 'Store below 25°C, keep dry',
    sideEffects: ['Stomach bleeding', 'Allergic reactions'],
    contraindications: ['Bleeding disorders', 'Asthma', 'Peptic ulcers'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 200, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 300, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-006', quantity: 300, lastUpdated: '2024-01-14' }
    ],
    badge: 'Heart Health',
    features: ['Heart Protection', 'Daily Use', 'Safe']
  },
  {
    id: 'med-004',
    name: 'Diclofenac 50mg',
    genericName: 'Diclofenac Sodium',
    description: 'Strong anti-inflammatory for arthritis pain and inflammation',
    category: 'pain-relief',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 3500,
    priceUSD: 2.80,
    stock: 150,
    rating: 4.7,
    reviews: 189,
    prescriptionRequired: true,
    inStock: true,
    dosage: '50mg',
    form: 'tablet',
    expiryDate: '2025-06-30',
    batchNumber: 'PR2024004',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Stomach pain', 'Nausea', 'Headache'],
    contraindications: ['Active stomach ulcers', 'Severe heart failure', 'Pregnancy'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 75, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 50, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 25, lastUpdated: '2024-01-15' }
    ],
    badge: 'Prescription',
    features: ['Arthritis Relief', 'Strong Anti-Inflammatory', 'Long Acting']
  },

  // Antibiotics
  {
    id: 'med-005',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin Trihydrate',
    description: 'Broad-spectrum antibiotic for bacterial infections',
    category: 'antibiotics',
    manufacturer: 'MediTech Rwanda',
    priceRWF: 8000,
    priceUSD: 6.40,
    stock: 200,
    rating: 4.9,
    reviews: 256,
    prescriptionRequired: true,
    inStock: true,
    dosage: '500mg',
    form: 'capsule',
    expiryDate: '2025-09-30',
    batchNumber: 'MT2024005',
    storageConditions: 'Store below 25°C, keep dry',
    sideEffects: ['Diarrhea', 'Nausea', 'Allergic reactions'],
    contraindications: ['Penicillin allergy', 'Mononucleosis'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 20, lastUpdated: '2024-01-14' }
    ],
    badge: 'Prescription',
    features: ['Broad Spectrum', 'Fast Acting', 'Well Tolerated']
  },
  {
    id: 'med-006',
    name: 'Azithromycin 250mg',
    genericName: 'Azithromycin Dihydrate',
    description: 'Macrolide antibiotic for respiratory and skin infections',
    category: 'antibiotics',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 12000,
    priceUSD: 9.60,
    stock: 100,
    rating: 4.8,
    reviews: 167,
    prescriptionRequired: true,
    inStock: true,
    dosage: '250mg',
    form: 'tablet',
    expiryDate: '2025-07-31',
    batchNumber: 'HP2024006',
    storageConditions: 'Store below 30°C, protect from light',
    sideEffects: ['Stomach upset', 'Diarrhea', 'Headache'],
    contraindications: ['Liver disease', 'Kidney disease', 'Heart rhythm problems'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 50, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 30, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 20, lastUpdated: '2024-01-15' }
    ],
    badge: 'Premium',
    features: ['Once Daily', 'Few Side Effects', 'Effective']
  },
  {
    id: 'med-007',
    name: 'Ciprofloxacin 500mg',
    genericName: 'Ciprofloxacin Hydrochloride',
    description: 'Fluoroquinolone antibiotic for urinary and respiratory infections',
    category: 'antibiotics',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 10000,
    priceUSD: 8.00,
    stock: 120,
    rating: 4.7,
    reviews: 145,
    prescriptionRequired: true,
    inStock: true,
    dosage: '500mg',
    form: 'tablet',
    expiryDate: '2025-11-30',
    batchNumber: 'PR2024007',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Nausea', 'Diarrhea', 'Headache', 'Tendon problems'],
    contraindications: ['Tendon disorders', 'Epilepsy', 'Pregnancy'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 60, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 40, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-006', quantity: 20, lastUpdated: '2024-01-15' }
    ],
    badge: 'Prescription',
    features: ['Broad Spectrum', 'Fast Acting', 'Well Studied']
  },

  // Supplements
  {
    id: 'med-008',
    name: 'Vitamin D3 1000 IU',
    genericName: 'Cholecalciferol',
    description: 'Essential vitamin for bone health and immune support',
    category: 'supplements',
    manufacturer: 'NutriLife Rwanda',
    priceRWF: 4500,
    priceUSD: 3.60,
    stock: 400,
    rating: 4.7,
    reviews: 189,
    prescriptionRequired: false,
    inStock: true,
    dosage: '1000 IU',
    form: 'capsule',
    expiryDate: '2026-01-31',
    batchNumber: 'NL2024008',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Rare allergic reactions', 'High calcium with overdose'],
    contraindications: ['High calcium levels', 'Kidney stones'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 150, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 100, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-006', quantity: 50, lastUpdated: '2024-01-15' }
    ],
    badge: '20% OFF',
    features: ['Immune Support', 'Bone Health', 'Daily Essential']
  },
  {
    id: 'med-009',
    name: 'Vitamin C 500mg',
    genericName: 'Ascorbic Acid',
    description: 'Antioxidant vitamin for immune system and skin health',
    category: 'supplements',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 2500,
    priceUSD: 2.00,
    stock: 600,
    rating: 4.6,
    reviews: 234,
    prescriptionRequired: false,
    inStock: true,
    dosage: '500mg',
    form: 'tablet',
    expiryDate: '2025-10-31',
    batchNumber: 'HP2024009',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Stomach upset with high doses', 'Kidney stones'],
    contraindications: ['Kidney disease', 'Iron overload'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 200, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 200, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 150, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 50, lastUpdated: '2024-01-15' }
    ],
    badge: 'Popular',
    features: ['Immune Boost', 'Antioxidant', 'Skin Health']
  },
  {
    id: 'med-010',
    name: 'Omega-3 Fish Oil',
    genericName: 'Omega-3 Fatty Acids',
    description: 'Premium fish oil for heart and brain health',
    category: 'supplements',
    manufacturer: 'NutriLife Rwanda',
    priceRWF: 15000,
    priceUSD: 12.00,
    stock: 200,
    rating: 4.9,
    reviews: 445,
    prescriptionRequired: false,
    inStock: true,
    dosage: '1000mg',
    form: 'capsule',
    expiryDate: '2025-08-31',
    batchNumber: 'NL2024010',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Fishy aftertaste', 'Burping', 'Bleeding risk'],
    contraindications: ['Bleeding disorders', 'Allergy to fish'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 20, lastUpdated: '2024-01-14' }
    ],
    badge: 'Premium',
    features: ['Heart Health', 'Brain Support', 'Pure Quality']
  },

  // Diabetes Medications
  {
    id: 'med-011',
    name: 'Metformin 500mg',
    genericName: 'Metformin Hydrochloride',
    description: 'Oral diabetes medication for blood sugar control',
    category: 'diabetes',
    manufacturer: 'MediTech Rwanda',
    priceRWF: 12000,
    priceUSD: 9.60,
    stock: 150,
    rating: 4.8,
    reviews: 167,
    prescriptionRequired: true,
    inStock: true,
    dosage: '500mg',
    form: 'tablet',
    expiryDate: '2025-09-30',
    batchNumber: 'MT2024011',
    storageConditions: 'Store below 25°C, keep dry',
    sideEffects: ['Stomach upset', 'Diarrhea', 'Lactic acidosis (rare)'],
    contraindications: ['Kidney disease', 'Liver disease', 'Heart failure'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 60, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 70, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 20, lastUpdated: '2024-01-14' }
    ],
    badge: 'Prescription',
    features: ['Blood Sugar Control', 'First Line Treatment', 'Well Studied']
  },
  {
    id: 'med-012',
    name: 'Glibenclamide 5mg',
    genericName: 'Glyburide',
    description: 'Sulfonylurea for type 2 diabetes management',
    category: 'diabetes',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 8000,
    priceUSD: 6.40,
    stock: 100,
    rating: 4.6,
    reviews: 98,
    prescriptionRequired: true,
    inStock: true,
    dosage: '5mg',
    form: 'tablet',
    expiryDate: '2025-07-31',
    batchNumber: 'PR2024012',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Low blood sugar', 'Weight gain', 'Skin reactions'],
    contraindications: ['Type 1 diabetes', 'Kidney disease', 'Pregnancy'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 50, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 30, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-006', quantity: 20, lastUpdated: '2024-01-15' }
    ],
    badge: 'Prescription',
    features: ['Sugar Control', 'Affordable', 'Effective']
  },

  // Cold & Flu Medications
  {
    id: 'med-013',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Hydrochloride',
    description: '24-hour allergy relief for seasonal allergies',
    category: 'cold-flu',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 6000,
    priceUSD: 4.80,
    stock: 300,
    rating: 4.7,
    reviews: 234,
    prescriptionRequired: false,
    inStock: true,
    dosage: '10mg',
    form: 'tablet',
    expiryDate: '2025-12-31',
    batchNumber: 'PR2024013',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Headache'],
    contraindications: ['Severe kidney disease', 'Pregnancy'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 120, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 50, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 30, lastUpdated: '2024-01-15' }
    ],
    badge: 'Allergy Relief',
    features: ['24-Hour Relief', 'Non-Drowsy Option', 'Fast Acting']
  },
  {
    id: 'med-014',
    name: 'Loratadine 10mg',
    genericName: 'Loratadine',
    description: 'Non-drowsy antihistamine for allergy symptoms',
    category: 'cold-flu',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 7500,
    priceUSD: 6.00,
    stock: 250,
    rating: 4.8,
    reviews: 189,
    prescriptionRequired: false,
    inStock: true,
    dosage: '10mg',
    form: 'tablet',
    expiryDate: '2025-10-31',
    batchNumber: 'HP2024014',
    storageConditions: 'Store below 25°C, keep dry',
    sideEffects: ['Headache', 'Dry mouth', 'Fatigue'],
    contraindications: ['Liver disease', 'Kidney disease'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-006', quantity: 70, lastUpdated: '2024-01-14' }
    ],
    badge: 'Non-Drowsy',
    features: ['No Sleepiness', 'Once Daily', 'Effective']
  },
  {
    id: 'med-015',
    name: 'Pseudoephedrine 60mg',
    genericName: 'Pseudoephedrine Hydrochloride',
    description: 'Decongestant for nasal congestion and sinus pressure',
    category: 'cold-flu',
    manufacturer: 'MediTech Rwanda',
    priceRWF: 4000,
    priceUSD: 3.20,
    stock: 200,
    rating: 4.5,
    reviews: 156,
    prescriptionRequired: false,
    inStock: true,
    dosage: '60mg',
    form: 'tablet',
    expiryDate: '2025-08-31',
    batchNumber: 'MT2024015',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Increased heart rate', 'Anxiety', 'Insomnia'],
    contraindications: ['High blood pressure', 'Heart disease', 'Thyroid problems'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 60, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 60, lastUpdated: '2024-01-15' }
    ],
    badge: 'Decongestant',
    features: ['Nasal Relief', 'Sinus Pressure Relief', 'Fast Acting']
  },

  // Stomach/GI Medications
  {
    id: 'med-016',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    description: 'Proton pump inhibitor for acid reflux and ulcers',
    category: 'stomach',
    manufacturer: 'Pharma Rwanda Ltd',
    priceRWF: 9000,
    priceUSD: 7.20,
    stock: 180,
    rating: 4.7,
    reviews: 198,
    prescriptionRequired: true,
    inStock: true,
    dosage: '20mg',
    form: 'capsule',
    expiryDate: '2025-11-30',
    batchNumber: 'PR2024016',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Headache', 'Diarrhea', 'Stomach pain'],
    contraindications: ['Liver disease', 'Bone fractures risk'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 70, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 30, lastUpdated: '2024-01-14' }
    ],
    badge: 'Prescription',
    features: ['Acid Control', 'Ulcer Healing', 'Long Lasting']
  },
  {
    id: 'med-017',
    name: 'Antacid Suspension',
    genericName: 'Aluminum Hydroxide/Magnesium Hydroxide',
    description: 'Fast-acting antacid for heartburn and indigestion',
    category: 'stomach',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 3500,
    priceUSD: 2.80,
    stock: 250,
    rating: 4.4,
    reviews: 134,
    prescriptionRequired: false,
    inStock: true,
    dosage: '400mg/5mL',
    form: 'syrup',
    expiryDate: '2025-06-30',
    batchNumber: 'HP2024017',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Constipation', 'Diarrhea', 'Mineral imbalance'],
    contraindications: ['Kidney disease', 'High blood pressure'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 70, lastUpdated: '2024-01-14' }
    ],
    badge: 'Fast Relief',
    features: ['Immediate Action', 'Liquid Form', 'Safe']
  },

  // Skin Care
  {
    id: 'med-018',
    name: 'Hydrocortisone Cream 1%',
    genericName: 'Hydrocortisone',
    description: 'Topical steroid for skin inflammation and itching',
    category: 'skin-care',
    manufacturer: 'Dermacare Rwanda',
    priceRWF: 5500,
    priceUSD: 4.40,
    stock: 150,
    rating: 4.6,
    reviews: 112,
    prescriptionRequired: false,
    inStock: true,
    dosage: '1%',
    form: 'cream',
    expiryDate: '2025-09-30',
    batchNumber: 'DC2024018',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Skin thinning', 'Burning', 'Allergic reactions'],
    contraindications: ['Skin infections', 'Rosacea', 'Acne'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 50, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 60, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-006', quantity: 40, lastUpdated: '2024-01-14' }
    ],
    badge: 'Skin Care',
    features: ['Anti-Inflammatory', 'Itch Relief', 'Fast Acting']
  },
  {
    id: 'med-019',
    name: 'Miconazole Cream 2%',
    genericName: 'Miconazole Nitrate',
    description: 'Antifungal cream for skin fungal infections',
    category: 'skin-care',
    manufacturer: 'Dermacare Rwanda',
    priceRWF: 7000,
    priceUSD: 5.60,
    stock: 120,
    rating: 4.7,
    reviews: 98,
    prescriptionRequired: false,
    inStock: true,
    dosage: '2%',
    form: 'cream',
    expiryDate: '2025-08-31',
    batchNumber: 'DC2024019',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Skin irritation', 'Burning', 'Allergic reactions'],
    contraindications: ['Eye area', 'Deep wounds', 'Pregnancy (large areas)'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 50, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 40, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 30, lastUpdated: '2024-01-15' }
    ],
    badge: 'Antifungal',
    features: ['Fungal Treatment', 'Broad Spectrum', 'Effective']
  },

  // Emergency Medications
  {
    id: 'med-020',
    name: 'Epinephrine Auto-Injector',
    genericName: 'Epinephrine',
    description: 'Emergency treatment for severe allergic reactions',
    category: 'emergency',
    manufacturer: 'EmergencyMed Rwanda',
    priceRWF: 45000,
    priceUSD: 36.00,
    stock: 50,
    rating: 4.9,
    reviews: 67,
    prescriptionRequired: true,
    inStock: true,
    dosage: '0.3mg',
    form: 'injection',
    expiryDate: '2025-04-30',
    batchNumber: 'EM2024020',
    storageConditions: 'Store at room temperature, protect from light',
    sideEffects: ['Anxiety', 'Palpitations', 'Headache'],
    contraindications: ['Heart disease', 'High blood pressure'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-002', quantity: 20, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 20, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-009', quantity: 10, lastUpdated: '2024-01-15' }
    ],
    badge: 'Emergency',
    features: ['Life Saving', 'Auto-Injector', 'Portable']
  },
  {
    id: 'med-021',
    name: 'Nitroglycerin Tablets',
    genericName: 'Nitroglycerin',
    description: 'Emergency treatment for chest pain (angina)',
    category: 'emergency',
    manufacturer: 'CardioCare Rwanda',
    priceRWF: 25000,
    priceUSD: 20.00,
    stock: 80,
    rating: 4.8,
    reviews: 45,
    prescriptionRequired: true,
    inStock: true,
    dosage: '0.4mg',
    form: 'tablet',
    expiryDate: '2025-03-31',
    batchNumber: 'CC2024021',
    storageConditions: 'Store in original container, below 25°C',
    sideEffects: ['Headache', 'Dizziness', 'Low blood pressure'],
    contraindications: ['Erectile dysfunction meds', 'Severe anemia'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 30, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-005', quantity: 30, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 20, lastUpdated: '2024-01-15' }
    ],
    badge: 'Heart Emergency',
    features: ['Chest Pain Relief', 'Fast Acting', 'Essential']
  },

  // Women's Health
  {
    id: 'med-022',
    name: 'Folic Acid 400mcg',
    genericName: 'Folic Acid',
    description: 'Essential for pregnancy and preventing birth defects',
    category: 'womens-health',
    manufacturer: 'NutriLife Rwanda',
    priceRWF: 3000,
    priceUSD: 2.40,
    stock: 300,
    rating: 4.8,
    reviews: 178,
    prescriptionRequired: false,
    inStock: true,
    dosage: '400mcg',
    form: 'tablet',
    expiryDate: '2026-01-31',
    batchNumber: 'NL2024022',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Rare allergic reactions'],
    contraindications: ['B12 deficiency (masking)', 'Seizure disorders'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 100, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 80, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-006', quantity: 20, lastUpdated: '2024-01-15' }
    ],
    badge: 'Pregnancy',
    features: ['Birth Defect Prevention', 'Prenatal Health', 'Essential']
  },
  {
    id: 'med-023',
    name: 'Iron Tablets 65mg',
    genericName: 'Ferrous Sulfate',
    description: 'Iron supplement for anemia prevention and treatment',
    category: 'womens-health',
    manufacturer: 'HealthPlus Rwanda',
    priceRWF: 4000,
    priceUSD: 3.20,
    stock: 250,
    rating: 4.5,
    reviews: 145,
    prescriptionRequired: false,
    inStock: true,
    dosage: '65mg',
    form: 'tablet',
    expiryDate: '2025-10-31',
    batchNumber: 'HP2024023',
    storageConditions: 'Store below 25°C, protect from moisture',
    sideEffects: ['Constipation', 'Stomach upset', 'Dark stools'],
    contraindications: ['Hemochromatosis', 'Ulcerative colitis'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 90, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-004', quantity: 50, lastUpdated: '2024-01-14' },
      { pharmacyId: 'pharmacy-007', quantity: 30, lastUpdated: '2024-01-15' }
    ],
    badge: 'Anemia',
    features: ['Iron Boost', 'Energy Support', 'Blood Health']
  },

  // Children's Medications
  {
    id: 'med-024',
    name: 'Children\'s Paracetamol 120mg/5mL',
    genericName: 'Acetaminophen',
    description: 'Fever and pain relief for children 6 months to 12 years',
    category: 'children',
    manufacturer: 'PediaCare Rwanda',
    priceRWF: 3500,
    priceUSD: 2.80,
    stock: 200,
    rating: 4.7,
    reviews: 234,
    prescriptionRequired: false,
    inStock: true,
    dosage: '120mg/5mL',
    form: 'syrup',
    expiryDate: '2025-09-30',
    batchNumber: 'PC2024024',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Rare allergic reactions', 'Liver issues with overdose'],
    contraindications: ['Liver disease', 'Allergy to paracetamol'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 70, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-002', quantity: 80, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 50, lastUpdated: '2024-01-14' }
    ],
    badge: 'Children',
    features: ['Gentle Formula', 'Fruit Flavor', 'Safe']
  },
  {
    id: 'med-025',
    name: 'Vitamin D Drops 400 IU',
    genericName: 'Cholecalciferol',
    description: 'Vitamin D supplement for infants and children',
    category: 'children',
    manufacturer: 'PediaCare Rwanda',
    priceRWF: 5000,
    priceUSD: 4.00,
    stock: 150,
    rating: 4.8,
    reviews: 167,
    prescriptionRequired: false,
    inStock: true,
    dosage: '400 IU/drop',
    form: 'drops',
    expiryDate: '2025-11-30',
    batchNumber: 'PC2024025',
    storageConditions: 'Store below 25°C, protect from light',
    sideEffects: ['Rare allergic reactions'],
    contraindications: ['High calcium levels', 'Kidney disease'],
    availablePharmacies: [
      { pharmacyId: 'pharmacy-001', quantity: 50, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-003', quantity: 60, lastUpdated: '2024-01-15' },
      { pharmacyId: 'pharmacy-006', quantity: 40, lastUpdated: '2024-01-14' }
    ],
    badge: 'Infant',
    features: ['Bone Development', 'Immune Support', 'Easy to Administer']
  }
]

export const getMedicinesByCategory = (category: string) => {
  return rwandanMedicines.filter(medicine => medicine.category === category)
}

export const getMedicinesByPharmacy = (pharmacyId: string) => {
  return rwandanMedicines.filter(medicine => 
    medicine.availablePharmacies.some(pharmacy => pharmacy.pharmacyId === pharmacyId)
  )
}

export const searchMedicines = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return rwandanMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(lowercaseQuery) ||
    medicine.genericName.toLowerCase().includes(lowercaseQuery) ||
    medicine.description.toLowerCase().includes(lowercaseQuery) ||
    medicine.manufacturer.toLowerCase().includes(lowercaseQuery)
  )
}

export const getPharmacyById = (pharmacyId: string) => {
  return rwandanPharmacies.find(pharmacy => pharmacy.id === pharmacyId)
}

export const getMedicineById = (medicineId: string) => {
  return rwandanMedicines.find(medicine => medicine.id === medicineId)
}
