
export default function Location() {
  return (
    <div className="bg-[#0875B5] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="flex items-center justify-center text-base font-semibold leading-7 text-white">
                APPA SUR LA CARTE
            </h2>
            <div className="mt-2 h-1 w-24 bg-[#8AC14B] mx-auto rounded"></div>
        </div>

        {/* Google Maps Embed (unchanged) */}
        <div className="mt-16 rounded-lg shadow-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.1708324601484!2d-7.6754217008025964!3d33.5616031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d300506091eb%3A0xc7d664258114e9b7!2sBoulevard%20oued%20Oum%20Rabia!5e0!3m2!1sen!2sus!4v1751570160476!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}