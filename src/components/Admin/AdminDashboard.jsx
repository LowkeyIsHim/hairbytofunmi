import Link from 'next/link';
import { HairDryer, Users, Settings, Plus, LayoutGrid } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import AdminTable from './AdminTable';
import Button from '../ui/Button';

export default function AdminDashboard({ styles, totalStyles, settings }) {
  const stats = [
    { name: 'Total Styles', value: totalStyles, icon: LayoutGrid },
    { name: 'Working Hours', value: settings?.working_hours || '9:00 AM - 7:00 PM', icon: HairDryer },
    { name: 'WhatsApp No.', value: settings?.whatsapp_number || 'N/A', icon: Users },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-serif font-bold text-deep-violet">Admin Dashboard</h1>
      <hr className="border-muted-lavender/30" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-premium border-l-4 border-soft-gold">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-deep-violet/70">{stat.name}</p>
              <stat.icon className="h-6 w-6 text-muted-lavender" />
            </div>
            <p className="mt-1 text-3xl font-bold text-deep-violet">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Style Management Section */}
      <div className="bg-white p-6 rounded-xl shadow-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-deep-violet">Hair Style Management</h2>
          <div className='space-x-4'>
            <Link href="/admin/settings">
              <Button variant="outline" className="text-sm">
                <Settings className='h-4 w-4 mr-2'/>
                Edit Settings
              </Button>
            </Link>
            <Link href="/admin/styles/add">
              <Button variant="primary" className="text-sm">
                <Plus className='h-4 w-4 mr-2'/>
                New Style
              </Button>
            </Link>
          </div>
        </div>

        {/* Styles Table */}
        <AdminTable styles={styles} />
      </div>
    </div>
  );
}
