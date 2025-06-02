
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FooterCTA = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h3>
        <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who found their dream homes with us.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/auth">Get Started Today</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full text-white border-white hover:bg-white hover:text-blue-600">
            <Link to="/single">Explore Demo Property</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
