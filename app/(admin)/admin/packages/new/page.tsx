import PackageForm from '@/components/admin/PackageForm';

export default function NewPackagePage() {
  return (
    <div className="p-4 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Create Package</h1>
        <p className="text-slate-500">Add a new pricing tier for your customers.</p>
      </div>

      <PackageForm />
    </div>
  );
}