import { FaArrowRight } from 'react-icons/fa';

const templates = [
  {
    id: 1,
    title: 'Urban Style',
    category: 'Fashion',
    image: 'https://csspicker.dev/api/image/?q=urban+street+style&image_type=photo',
  },
  {
    id: 2,
    title: 'Neon Nights',
    category: 'Music',
    image: 'https://csspicker.dev/api/image/?q=neon+cyberpunk&image_type=photo',
  },
  {
    id: 3,
    title: 'Portrait Pro',
    category: 'Photography',
    image: 'https://csspicker.dev/api/image/?q=portrait+studio&image_type=photo',
  },
  {
    id: 4,
    title: 'Dark Mode',
    category: 'Tech',
    image: 'https://csspicker.dev/api/image/?q=dark+moody+portrait&image_type=photo',
  },
  {
    id: 5,
    title: 'Clean Minimal',
    category: 'Corporate',
    image: 'https://csspicker.dev/api/image/?q=minimal+white+portrait&image_type=photo',
  },
  {
    id: 6,
    title: 'Street Life',
    category: 'Documentary',
    image: 'https://csspicker.dev/api/image/?q=street+photography&image_type=photo',
  },
];

export const Templates = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Templates</h2>
          <p className="text-gray-400 text-sm">Choose from hundreds of professional templates</p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  {template.category}
                </span>
                <h3 className="text-white font-semibold mt-1">{template.title}</h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaArrowRight size={16} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            View all templates
            <FaArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};