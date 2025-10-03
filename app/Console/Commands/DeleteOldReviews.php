<?php

namespace App\Console\Commands;

use App\Models\BlogReviewsModel;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class DeleteOldReviews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-old-reviews';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete blog reviews older than 7 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $cutoffDate = Carbon::now()->subDays(7);
            
            $this->info("Starting deletion of reviews older than: {$cutoffDate}");
            
            $deletedCount = BlogReviewsModel::where('created_at', '<', $cutoffDate)->delete();
            
            $this->info("✅ Successfully deleted {$deletedCount} reviews older than 7 days.");
            
            Log::info("Auto-deleted {$deletedCount} blog reviews older than 7 days", [
                'cutoff_date' => $cutoffDate,
                'deleted_at' => now(),
                'command' => 'app:delete-old-reviews'
            ]);
            
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            $this->error("❌ Failed to delete old reviews: " . $e->getMessage());
            
            Log::error("Failed to delete old reviews: " . $e->getMessage(), [
                'exception' => $e,
                'command' => 'app:delete-old-reviews'
            ]);
            
            return Command::FAILURE;
        }
    }
}