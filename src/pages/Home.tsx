import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">Autonance Admin</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Simplify mandate management and customer operations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
                        <p className="mb-4">Manage customer profiles and accounts.</p>
                        <Button onClick={() => navigate('/customers')}>Go to Customers</Button>
                    </div>

                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                        <h2 className="text-2xl font-semibold mb-4">Mandates</h2>
                        <p className="mb-4">Handle mandate approvals and payments.</p>
                        <Button onClick={() => navigate('/mandates')}>Go to Mandates</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
