/**
 * Setup script for Contentful DBT web v1 space
 *
 * This script:
 * 1. Creates Content Types (paginaInicio, seccionServicio)
 * 2. Publishes them
 * 3. Creates dummy entries for testing
 *
 * Usage:
 *   npx ts-node scripts/setup-contentful.ts
 *
 * Requires env variables:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_TOKEN
 */

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "i9biw4ut49ej";
const MANAGEMENT_TOKEN =
  process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  "CFPAT-cbosj8oIUiotZGPHPN8oUwuk9OvjVtaldi1wr_MmWR4";
const ENVIRONMENT_ID = "master";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setupContentful() {
  try {
    console.log("🚀 Starting Contentful DBT web v1 setup...\n");

    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    console.log(`✓ Connected to Space: ${SPACE_ID}`);
    console.log(`✓ Environment: ${ENVIRONMENT_ID}\n`);

    // Check if content types already exist
    const existingTypes = await environment.getContentTypes();
    const existingTypeIds = existingTypes.items.map((ct) => ct.sys.id);

    // ============================================
    // 1. Create Content Type: paginaInicio
    // ============================================
    let paginaInicioId = "paginaInicio";
    if (existingTypeIds.includes(paginaInicioId)) {
      console.log(`⚠️  Content Type '${paginaInicioId}' already exists. Skipping creation.`);
    } else {
      console.log(`📝 Creating Content Type: ${paginaInicioId}...`);

      const paginaInicio = await environment.createContentType({
        sys: { id: paginaInicioId },
        name: "Home Page",
        description: "Main landing page content for DBT web v1",
        fields: [
          {
            id: "heroTitulo",
            name: "Hero Title",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [{ size: { min: 1, max: 200 } }],
          },
          {
            id: "heroSubtitulo",
            name: "Hero Subtitle",
            type: "Text",
            required: false,
            localized: false,
          },
          {
            id: "ctaTexto",
            name: "CTA Text",
            type: "Symbol",
            required: false,
            localized: false,
            validations: [{ size: { min: 1, max: 100 } }],
          },
          {
            id: "bookingTitulo",
            name: "Booking Title",
            type: "Symbol",
            required: false,
            localized: false,
          },
          {
            id: "bookingUrl",
            name: "Booking URL",
            type: "Symbol",
            required: false,
            localized: false,
            validations: [
              {
                regexp: {
                  pattern: "^(https?://)?[^\\s]+$",
                  flags: "",
                },
              },
            ],
          },
        ],
        displayField: "heroTitulo",
      });

      await paginaInicio.publish();
      console.log(`✓ Created and published: ${paginaInicioId}\n`);
    }

    // ============================================
    // 2. Create Content Type: seccionServicio
    // ============================================
    let seccionServicioId = "seccionServicio";
    if (existingTypeIds.includes(seccionServicioId)) {
      console.log(
        `⚠️  Content Type '${seccionServicioId}' already exists. Skipping creation.`,
      );
    } else {
      console.log(`📝 Creating Content Type: ${seccionServicioId}...`);

      const seccionServicio = await environment.createContentType({
        sys: { id: seccionServicioId },
        name: "Service Section",
        description: "Individual service offering card",
        fields: [
          {
            id: "titulo",
            name: "Title",
            type: "Symbol",
            required: true,
            localized: false,
            validations: [{ size: { min: 1, max: 150 } }],
          },
          {
            id: "descripcion",
            name: "Description",
            type: "Text",
            required: false,
            localized: false,
          },
          {
            id: "icono",
            name: "Icon / Image",
            type: "Link",
            linkType: "Asset",
            required: false,
            localized: false,
          },
        ],
        displayField: "titulo",
      });

      await seccionServicio.publish();
      console.log(`✓ Created and published: ${seccionServicioId}\n`);
    }

    // ============================================
    // 3. Create dummy entries (optional)
    // ============================================
    console.log("📚 Creating dummy content entries...\n");

    // Single paginaInicio entry
    try {
      const entries = await environment.getEntries({
        content_type: paginaInicioId,
      });

      if (entries.items.length === 0) {
        console.log(`📝 Creating dummy paginaInicio entry...`);
        const paginaEntry = await environment.createEntry(paginaInicioId, {
          fields: {
            heroTitulo: {
              "en-US":
                "DBT web v1 — Terapia basada en evidencia, con calma y claridad",
            },
            heroSubtitulo: {
              "en-US":
                "Un espacio seguro para trabajar habilidades de regulación emocional, tolerancia al malestar y relaciones más sanas. Nuestro enfoque se basa en la Terapia Dialéctica del Comportamiento (DBT).",
            },
            ctaTexto: {
              "en-US": "Agendar primera sesión",
            },
            bookingTitulo: {
              "en-US": "Reserva tu cita",
            },
            bookingUrl: {
              "en-US": "",
            },
          },
        });

        await paginaEntry.publish();
        console.log(`✓ Created and published paginaInicio entry\n`);
      } else {
        console.log(`⚠️  paginaInicio entries already exist. Skipping.\n`);
      }
    } catch (error) {
      console.error(`❌ Error creating paginaInicio entry:`, error);
    }

    // Three seccionServicio entries
    try {
      const entries = await environment.getEntries({
        content_type: seccionServicioId,
      });

      if (entries.items.length === 0) {
        const services = [
          {
            titulo: "Terapia DBT individual",
            descripcion:
              "Sesiones de terapia individual enfocadas en habilidades DBT. Trabajamos juntos en regulación emocional, tolerancia al malestar, efectividad interpersonal y mindfulness.",
          },
          {
            titulo: "Entrenamiento de habilidades",
            descripcion:
              "Módulos estructurados de entrenamiento en las cuatro pilares de DBT: mindfulness, regulación emocional, tolerancia al malestar, y efectividad interpersonal.",
          },
          {
            titulo: "Acompañamiento en crisis",
            descripcion:
              "Soporte especializado en momentos de crisis. Incluye planes de seguridad, técnicas de contención emocional, y herramientas de respuesta rápida.",
          },
        ];

        for (const service of services) {
          console.log(`📝 Creating service: ${service.titulo}...`);
          const serviceEntry = await environment.createEntry(
            seccionServicioId,
            {
              fields: {
                titulo: {
                  "en-US": service.titulo,
                },
                descripcion: {
                  "en-US": service.descripcion,
                },
              },
            },
          );

          await serviceEntry.publish();
          console.log(`✓ Published: ${service.titulo}`);
          await sleep(100);
        }

        console.log();
      } else {
        console.log(
          `⚠️  seccionServicio entries already exist (${entries.items.length}). Skipping.\n`,
        );
      }
    } catch (error) {
      console.error(`❌ Error creating seccionServicio entries:`, error);
    }

    console.log("✅ Contentful setup complete!\n");
    console.log("Next steps:");
    console.log(
      `1. Set these env vars in your app to connect to Contentful:\n`,
    );
    console.log(`   VITE_CONTENTFUL_SPACE_ID=${SPACE_ID}`);
    console.log(
      `   VITE_CONTENTFUL_DELIVERY_TOKEN=<your-delivery-api-key>\n`,
    );
    console.log(`2. Get your Delivery API key from Contentful dashboard`);
    console.log(`3. Refresh your app to load the CMS content\n`);
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

setupContentful();
