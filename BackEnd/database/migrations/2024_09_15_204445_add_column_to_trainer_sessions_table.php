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
        Schema::table('trainer_sessions', function (Blueprint $table) {
            //
            $table->foreignId('class_id')->constrained('classes','id')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trainer_sessions', function (Blueprint $table) {
            //
            $table->dropForeign('trainer_sessions_class_id_foreign');
            $table->dropColumn('class_id');
        });
    }
};
