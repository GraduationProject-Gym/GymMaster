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
        Schema::table('user_equipments', function (Blueprint $table) {
            //
            $table->foreignId('user_id')->constrained('users',column: 'id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('equipment_id')->constrained('equipments','id')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_equipments', function (Blueprint $table) {
            //
            $table->dropForeign('user_equipments_user_id_foreign');
            $table->dropColumn('user_id');
            $table->dropForeign('user_equipments_equipment_id_foreign');
            $table->dropColumn('equipment_id');
        });
    }
};
