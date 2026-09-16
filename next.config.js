const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// Maps the old islandtoweruae.ae site's flat .html URLs to their closest
// equivalent on this site, so anything Google indexed (or anyone bookmarked)
// from the old site 301s to a real page instead of 404ing once DNS points
// here. Pages with no real equivalent (Civil/Chemical/Water/Energy/R&D -
// sister-company scope) fall back to /services rather than dead-ending.
const legacyRedirects = [
  ['/index.html', '/'],
  ['/overview.html', '/about'],
  ['/history.html', '/about'],
  ['/values.html', '/about'],
  ['/clients.html', '/about'],
  ['/responsibility.html', '/about'],
  ['/quality.html', '/services'],
  ['/hse.html', '/services'],
  ['/sustainability.html', '/services'],
  ['/technology.html', '/services'],
  ['/solutions.html', '/services'],
  ['/infrastructure.html', '/services'],
  ['/civil.html', '/services'],
  ['/chemical.html', '/services'],
  ['/water.html', '/services'],
  ['/energy.html', '/services'],
  ['/rd.html', '/services'],
  ['/MEP.html', '/services'],
  ['/mep.html', '/services'],
  ['/projects.html', '/projects'],
  ['/electrical.html', '/projects/dragon-mart-district-cooling'],
  ['/fabrication.html', '/projects/green-field-dubai-process-piping'],
  ['/flushing.html', '/projects/saadiyat-chilled-water-flushing'],
  ['/rta.html', '/projects/al-shindagha-corridor-chilled-water'],
  ['/tecom.html', '/projects/dubai-multi-district-chilled-water-network'],
  ['/TR.html', '/projects/dubai-multi-district-chilled-water-network'],
  ['/tr.html', '/projects/dubai-multi-district-chilled-water-network'],
  ['/jvt.html', '/projects/jumeirah-village-triangle-district-cooling-phase-3'],
  ['/replacement.html', '/projects/chilled-water-pump-replacement-works'],
  ['/career.html', '/careers'],
  ['/contact.html', '/contact'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

module.exports = withNextIntl(nextConfig)
