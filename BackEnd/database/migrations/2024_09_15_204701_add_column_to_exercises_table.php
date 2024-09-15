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
        Schema::table('exercises', function (Blueprint $table) {
            //
            $table->foreignId('class_id')->constrained('classes','id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('equipment_id')->constrained('equipments','id')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            //
            $table->dropForeign('exercises_class_id_foreign');
            $table->dropColumn('class_id');
            $table->dropForeign('exercises_equipment_id_foreign');
            $table->dropColumn('equipment_id');
        });
    }
};
