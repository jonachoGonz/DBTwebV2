# Contentful DBT web v1 Setup Guide

This guide explains how to set up your Contentful space with the required Content Models and dummy data.

## Option 1: Manual Setup (Recommended if token issues persist)

### Step 1: Create Content Type `paginaInicio`

1. Log into your Contentful space: **i9biw4ut49ej**
2. Go to **Content model** > **Add content type**
3. Set:
   - **ID**: `paginaInicio`
   - **Display name**: `Home Page`
   - **Description**: Main landing page content for DBT web v1

4. Add these fields in order:

#### Field 1: `heroTitulo` (required)
- **Field ID**: `heroTitulo`
- **Field name**: `Hero Title`
- **Type**: Short text (Symbol)
- **Required**: Yes
- **Validation**: Min 1, Max 200 characters

#### Field 2: `heroSubtitulo`
- **Field ID**: `heroSubtitulo`
- **Field name**: `Hero Subtitle`
- **Type**: Long text (Text)
- **Required**: No

#### Field 3: `ctaTexto`
- **Field ID**: `ctaTexto`
- **Field name**: `CTA Text`
- **Type**: Short text (Symbol)
- **Required**: No
- **Validation**: Max 100 characters

#### Field 4: `bookingTitulo`
- **Field ID**: `bookingTitulo`
- **Field name**: `Booking Title`
- **Type**: Short text (Symbol)
- **Required**: No

#### Field 5: `bookingUrl`
- **Field ID**: `bookingUrl`
- **Field name**: `Booking URL`
- **Type**: Short text (Symbol)
- **Required**: No
- **Validation**: Regexp pattern for URLs (optional)

5. Set **display field** to `heroTitulo`
6. **Save** and **Publish**

### Step 2: Create Content Type `seccionServicio`

1. Go to **Content model** > **Add content type**
2. Set:
   - **ID**: `seccionServicio`
   - **Display name**: `Service Section`
   - **Description**: Individual service offering card

3. Add these fields in order:

#### Field 1: `titulo` (required)
- **Field ID**: `titulo`
- **Field name**: `Title`
- **Type**: Short text (Symbol)
- **Required**: Yes
- **Validation**: Min 1, Max 150 characters

#### Field 2: `descripcion`
- **Field ID**: `descripcion`
- **Field name**: `Description`
- **Type**: Long text (Text)
- **Required**: No

#### Field 3: `icono`
- **Field ID**: `icono`
- **Field name**: `Icon / Image`
- **Type**: Link
- **Link type**: Asset (Media)
- **Required**: No

4. Set **display field** to `titulo`
5. **Save** and **Publish**

### Step 3: Create Dummy Content

#### Create 1 `paginaInicio` entry:

1. Go to **Content** > **Add entry** > Select `paginaInicio`
2. Fill in:
   - **heroTitulo**: `DBT web v1 — Terapia basada en evidencia, con calma y claridad`
   - **heroSubtitulo**: `Un espacio seguro para trabajar habilidades de regulación emocional, tolerancia al malestar y relaciones más sanas.`
   - **ctaTexto**: `Agendar primera sesión`
   - **bookingTitulo**: `Reserva tu cita`
   - **bookingUrl**: Leave empty for now (or enter your Calendly/Cal.com embed URL)
3. **Save and Publish**

#### Create 3 `seccionServicio` entries:

**Entry 1:**
- **titulo**: `Terapia DBT individual`
- **descripcion**: `Sesiones de terapia individual enfocadas en habilidades DBT. Trabajamos juntos en regulación emocional, tolerancia al malestar, efectividad interpersonal y mindfulness.`

**Entry 2:**
- **titulo**: `Entrenamiento de habilidades`
- **descripcion**: `Módulos estructurados de entrenamiento en las cuatro pilares de DBT: mindfulness, regulación emocional, tolerancia al malestar, y efectividad interpersonal.`

**Entry 3:**
- **titulo**: `Acompañamiento en crisis`
- **descripcion**: `Soporte especializado en momentos de crisis. Incluye planes de seguridad, técnicas de contención emocional, y herramientas de respuesta rápida.`

For each, **Save and Publish**.

---

## Option 2: Automated Setup with Script

If your management token has proper permissions, use the automated script:

```bash
npx tsx scripts/setup-contentful.ts
```

### Prerequisites:
- Valid `CONTENTFUL_SPACE_ID` (i9biw4ut49ej)
- Valid `CONTENTFUL_MANAGEMENT_TOKEN` with permissions
- Environment: master

---

## Step 4: Connect Your App to Contentful

Once your Content Models are published, add your **Delivery API key** to your app settings:

1. In Contentful: **Settings** > **API keys** > **Content Delivery API keys**
2. Copy your **Space ID** and **Content Delivery Token**
3. In Builder.io project settings, add env vars:
   - `VITE_CONTENTFUL_SPACE_ID=i9biw4ut49ej`
   - `VITE_CONTENTFUL_DELIVERY_TOKEN=<your-token>`

4. Refresh the app preview — content should now load from Contentful!

---

## Troubleshooting

### Content not loading?
- Verify Space ID and Delivery Token are correct
- Ensure content type IDs match: `paginaInicio`, `seccionServicio`
- Check that entries are **Published** (not draft)
- Verify field names match: `heroTitulo`, `heroSubtitulo`, `ctaTexto`, `bookingTitulo`, `bookingUrl`, `titulo`, `descripcion`, `icono`

### Script fails with "OrganizationAccessGrantRequired"?
- The management token may not have access to the space
- Try using the manual setup (Option 1) instead
- Or generate a new CMA token with full space access

---

## API Response Format

The app expects this structure when fetching from Contentful:

```typescript
{
  heroTitulo: string;
  heroSubtitulo: string;
  ctaTexto: string;
  bookingTitulo: string;
  bookingUrl?: string;
  services: Array<{
    titulo: string;
    descripcion: string;
    iconoUrl?: string;
    iconoAlt?: string;
  }>;
}
```

The mapping is handled automatically by `client/services/contentful.ts` and `client/hooks/useContentfulData.ts`.
