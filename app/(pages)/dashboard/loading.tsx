import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'


const DashboardLoading = () => {
    return (
    <div className="flex-1 flex flex-col mt-10 overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
                <Skeleton className='w-1/2 h-4'/>
                <Skeleton className='w-1/4 h-4'/>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({length:4}).map(
                    (_,idx)=><Skeleton key={idx} className='p-6 rounded-2xl h-32'/>
                )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <Skeleton className='w-20 h-4'/>
                    <Skeleton className='w-20 h-8 rounded-xl'/>
                </div>

                {/* Projects Grid */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Array.from({length:4}).map((_,idx)=>(
                            <Skeleton className="w-full h-fit py-8 p-2" key={idx}>
                                <div className="flex justify-between">
                                    <Skeleton className='w-20 h-4 bg-gray-200 dark:bg-neutral-900'/>
                                    <Skeleton className='w-15 h-4 bg-gray-200 dark:bg-neutral-900'/>
                                </div>
                                <Skeleton className='w-20 h-4 mt-2 bg-gray-200 dark:bg-neutral-900'/>
                                <Skeleton className='w-24 h-3 mt-3 bg-gray-200 dark:bg-neutral-900'/>
                                <Skeleton className='h-7 w-[90%] mt-3 bg-gray-200 dark:bg-neutral-900 rounded-2xl'/>
                            </Skeleton>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Skeleton className='w-20 h-4'/>
                  <div className="flex gap-4 overflow-x-hidden pb-2">
                        {Array.from({length:2}).map((_,idx)=>(
                        <Skeleton className='w-full p-2 space-y-2 py-4 h-fit' key={idx}>
                            <Skeleton className='w-16 h-2 bg-gray-200 dark:bg-neutral-900'/>
                            <Skeleton className='w-10 h-4 bg-gray-200 dark:bg-neutral-900'/>
                            <Skeleton className='w-48 h-4 bg-gray-200 dark:bg-neutral-900'/>
                            <Skeleton className='w-16 h-4 bg-gray-200 dark:bg-neutral-900'/>
                            <Skeleton className='w-48 h-8 mt-2 bg-gray-200 dark:bg-neutral-900'/>
                        </Skeleton>
                        ))}
                  </div>
                </div>
              </div>

              {/* Notifications Widget */}
              <div className="lg:col-span-1">
                <Card className="rounded-2xl shadow-[var(--shadow-card)]">
                    <div className="p-5 border-b border-border">
                        <div className="flex items-center justify-between">
                            <Skeleton className='w-20 h-4'/>
                        </div>
                    </div>
                    <div className="">
                        <div className="p-3 space-y-2 flex flex-col overflow-hidden">
                            {Array.from({length:4}).map((_,index)=>(
                            <Skeleton className="w-full h-20" key={index}>
                                <div className="p-2 flex gap-2">
                                    <Skeleton className="h-6 w-8 bg-gray-200 dark:bg-neutral-900"/>
                                    <Skeleton className='h-4 w-50 bg-gray-200 dark:bg-neutral-900'/>
                                </div>
                                <Skeleton className='h-4 w-96 bg-gray-200 dark:bg-neutral-900 ml-12'/>
                                <Skeleton className= 'bg-gray-200 dark:bg-neutral-900 w-12 h-3 ml-12 mt-2'/>
                            </Skeleton>
                            ))}
                        </div>
                    </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
    </div>
    )
}

export default DashboardLoading