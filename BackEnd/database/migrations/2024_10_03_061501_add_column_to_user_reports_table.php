<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->foreignId('trainee_id')->constrained('trainees','user_id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('trainer_id')->constrained('trainers','user_id')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            //
            $table->dropForeign('reports_trainee_id_foreign');
            $table->dropColumn('trainee_id');
            $table->dropForeign('reports_trainer_id_foreign');
            $table->dropColumn('trainer_id');
        });
    }
};
