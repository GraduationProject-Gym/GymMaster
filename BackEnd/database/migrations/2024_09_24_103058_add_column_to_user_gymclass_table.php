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
        Schema::table('gymclass', function (Blueprint $table) {
            //
            $table->foreignId('creator_id')->constrained('users','id')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gymclass', function (Blueprint $table) {
            //creator_id
            $table->dropForeign('gymclass_creator_id_foreign');
            $table->dropColumn('creator_id');
        });
    }
};
